from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, ForeignKey, MetaData, Table, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.orm import relationship
from database import Base, metadata
from pydantic import BaseModel
from typing import Annotated, List, Optional
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv
import crud, models, schemas


load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 24*60 # 1 day

print(DATABASE_URL)



event_attendees = Table(
    'event_attendees',
    metadata,
    Column ('event_id', Integer, ForeignKey('events.id'),primary_key=True),
    Column ('user_id', Integer, ForeignKey('users.id'),primary_key = True)
)

Base = declarative_base()
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    attending = relationship("Event", secondary = event_attendees ,back_populates="attendees")

class Event(Base):
    __tablename__= 'events'
    id = Column(Integer, primary_key=True, index = True)
    title = Column(String(100), unique=True, nullable=False, index = True)
    description = Column(String)
    host_id = Column(Integer, ForeignKey("users.id"),nullable = False) # user id
    host = relationship("User", back_populates= "events")
    attendees = relationship ("User", secondary = event_attendees, back_populates= "attending")


class UserIn(BaseModel):
    username: str
    password: str
    email: str = None

class UserOut(BaseModel):
    id: int
    username: str
    email: str



class UserBase(BaseModel):
    username: str
    email: str
    student_id: str


class UserCreate(UserBase):
    password: str

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None

class EventCreate(EventBase):
    host_id: int
    attendee_ids: List[int] = []

class Event(EventBase):
    id:int 
    host: User
    attendees: List[User] = []

    class Config:
        orm_mode = True




## CRUD operations 



engine = create_engine(DATABASE_URL, echo=True)
# engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user(db: Session, username: str)->User:
    User = db.query(User).filter(User.username == username).first()
    return User


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()







def get_event(db: Session, event_id: int):
    return db.query(Event).filter(Event.id == event_id).first()





def create_event(db: Session, event: EventCreate):
    db_event= Event(title=event.title, description=event.description, host_id=event.host_id)
    db.add(db.event)
    db.commit()
    db.refresh(db_event)

    for attendee_id in event.attendee_ids:
        attendee = get_user(db, attendee_id)
        if attendee:
            db_event.attendees.append(attendee)
    db.commit()

    return db_event


def add_attendee_to_event(db: Session, event_id: int, user_id: int):
    event = get_event(db, event_id)
    user = get_user(db, user_id)
    if event and user:
        event.attendees.append(user)
        db.commit()
        return event
    else:
        return None


class TokenData(BaseModel):
    username: str | None = None

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)



def get_current_user(db: Annotated[Session, Depends(get_db)], token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    User = get_user(db, token_data.username)
    if User is None:
        raise credentials_exception
    return User

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)







@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    User = authenticate_user(db, form_data.username, form_data.password)
    if User:
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": form_data.username}, expires_delta=access_token_expires)
        return {
            "access_token": access_token
        }
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password!")

@app.post("/register")
def register(user: UserIn, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists!")
    else:
        new_user = User(username=user.username, password=get_password_hash(user.password), email=user.email)
        db.add(new_user)
        db.commit()
        return JSONResponse(content={"message": "You have successfully registered!"})


@app.post("/EventSignup")
def EventSignup(user: UserIn, db: Session = Depends(get_db)):
    return 0





@app.post("/EventCreate",response_model=schemas.Event)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db=db, event=event)




if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
