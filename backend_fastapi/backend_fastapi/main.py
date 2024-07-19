from typing import List
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Date, LargeBinary, Table, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from typing import Annotated, Optional, Union
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv


load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 24*60 # 1 day

print(DATABASE_URL)

Base = declarative_base()

# accounts table
class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    title = Column(String(100), unique=False, nullable=True)
    bio = Column(String(500), unique=False, nullable=True)
    pfp = Column(LargeBinary(length=65536), unique=False, nullable=True)
    github = Column(String(100), unique=False, nullable=True)
    twitter = Column(String(100), unique=False, nullable=True)
    instagram = Column(String(100), unique=False, nullable=True)
    hosted_events = relationship('Event', back_populates='host')

# events table
class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable =False)
    description = Column(String(300),nullable= False)
    date = Column(Date, nullable = False)
    host_id = Column(Integer, ForeignKey('accounts.id'), nullable=False)
    host = relationship('Account', back_populates='hosted_events')

engine = create_engine(DATABASE_URL, echo=True)
# engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def get_db():
    """
    Creates a database session for each database request.

    Returns: A database session until it is no longer required by the request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class TokenData(BaseModel):
    username: str | None = None

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

app = FastAPI()

def verify_password(plain_password, hashed_password):
    """
    Verify entered password with stored hashed password using passlib.

    Args: 
        plain_password (str): The password the user enters to log in.
        hashed_password (str): The hashed password stored in database to compare with.
    Returns:
        bool: True or False depending on if user entered right password.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """
    Hashes an entered password using passlib.

    Args:
        password (str): the password the user enters to register their account.
    
    Returns: 
        str: A hash of the entered password, for extra security when storing said password.
    """
    return pwd_context.hash(password)

def get_user(db: Session, username: str)->Account:
    """
    Get the current user's data from the database using their unique username.

    Args:
        db (Session): The current database session open for the request.
        username (str): The username of the account we want to access.
    
    Returns:
        Account: The account with username username.
    """
    account = db.query(Account).filter(Account.username == username).first()
    return account

def get_current_user(db: Annotated[Session, Depends(get_db)], token: Annotated[str, Depends(oauth2_scheme)]):
    """
    Get the account data of the current user with the website open, to display/edit profile information
    Makes sure the user is logged in.

    Args:
        db (Session): The current database session open for the request.
        token (str): The user token, to check if the user is logged in.
    
    Returns:
        Account: The account of the current user opening their profile.
    
    Raises:
        InvalidTokenError: If their login token is invalid. (IE have not logged in)
    """
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
    account = get_user(db, token_data.username)
    if account is None:
        raise credentials_exception
    return account

def authenticate_user(db: Session, username: str, password: str):
    """
    Checks if the user with username and password exists in the database.

    Args:
        db (Session): The database session open for the request using this function.
        username (str): The entered username we are authenticating against the database.
        password (str): The entered password we are authenticating against the database.
    
    Returns:
        False: If username and/or password does not exist in the database.
        Account: The account with username and password that we have successfully found in the database.
    """
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta):
    """
    Creates a JSON web token for any logged in user, and sets a timer on it.

    Args:
        data (dict): The entered username and password of the user who logged in.
        expires_delta (timedelta): How long the token will be valid for.

    Returns:
        str: The encoded JSON web token.
    """
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

class UserIn(BaseModel):
    username: str
    password: str
    email: str = None

class UserOut(BaseModel):
    id: int
    username: str
    email: str


class EventIn(BaseModel):
    title: str
    description: str
    date: datetime
   

class EventOut(BaseModel):
    id: int
    title: str
    description: str
    date: datetime
    host_id: int


class UserUpdate(BaseModel):
    title: Optional[str]
    bio: Optional[str]
    github: Optional[str]
    twitter: Optional[str]
    instagram: Optional[str]
    pfp: Optional[Union[UploadFile, bytes]]

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Endpoint to authenticate user login and provide access token.

    Args:
        form_data (OAuth2PasswordRequestForm): Form data containing username and password.
        db (Session): Database session dependency.

    Returns:
        JWT: Returns a JSON web token allowing the user to remain logged in for a period of time.

    Raises:
        HTTPException: Raises HTTP 400 error for incorrect username or password.
    """
    account = authenticate_user(db, form_data.username, form_data.password)
    if account:
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": form_data.username}, expires_delta=access_token_expires)
        return {
            "access_token": access_token
        }
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password!")

@app.post("/register")
def register(user: UserIn, db: Session = Depends(get_db)):
    """
    Endpoint to register a new user.

    Args:
        user (UserIn): User input data including username, password, and email.
        db (Session): Database session dependency.

    Returns:
        JSONResponse: Success message upon successful registration.

    Raises:
        HTTPException: Raises HTTP 400 error if username or email already exists.
    """
    existing_user = db.query(Account).filter((Account.username == user.username) | (Account.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists!")
    else:
        new_user = Account(username=user.username, password=get_password_hash(user.password), email=user.email)
        db.add(new_user)
        db.commit()
        return JSONResponse(content={"message": "You have successfully registered!"})

@app.post("/EventsPage")
def register_event(event: EventIn, current_user: Account = Depends(get_current_user), db: Session = Depends(get_db)):
    new_event = Event( title= event.title,description= event.description, date= event.date )
    new_event.host_id = current_user.id
    db.add(new_event)
    db.commit()
    return JSONResponse(content={"message": "You have successfully created an event!"})

@app.get("/profile")
def get_profile(current_user: Account = Depends(get_current_user)):
    """
    Endpoint to retrieve the profile of the current authenticated user.

    Args:
        current_user (Account): Current authenticated user obtained from token.

    Returns:
        Account: Current user's profile information.
    """
    return current_user

@app.put("/profile")
def update_profile(profile_data: UserUpdate, current_user: Account = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Endpoint to update the profile of the current authenticated user.

    Args:
        profile_data (UserUpdate): User profile data to update.
        current_user (Account): Current authenticated user obtained from token.
        db (Session): Database session dependency.

    Returns:
        Account: Updated user profile information.
    """
    current_user.title = profile_data.title
    current_user.bio = profile_data.bio
    current_user.github = profile_data.github
    current_user.twitter = profile_data.twitter
    current_user.instagram = profile_data.instagram
    if profile_data.pfp:
        current_user.pfp = profile_data.pfp
    db.commit()
    return current_user

@app.get("/accounts/{account_id}/hosted-events", response_model=List[EventOut])
def get_hosted_events(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if account:
        hosted_events = (db.query(Event)
                         .filter(Event.host_id == account_id)
                         .order_by(Event.date.desc())
                         .limit(3)
                         .all())
        return hosted_events
    return []

@app.get("/accounts/{account_id}/all-hosted-events", response_model=dict)
def get_hosted_events(
    account_id: int,
    page: int = Query(1, gt=0),
    limit: int = Query(6, gt=0),
    db: Session = Depends(get_db)
):
    # Check if account exists
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    # Calculate offset for pagination
    offset = (page - 1) * limit

    # Query for events with pagination
    events_query = (
        db.query(Event)
        .filter(Event.host_id == account_id)
        .order_by(Event.date.desc())
        .offset(offset)
        .limit(limit)
    )
    events = events_query.all()

    # Count total events for pagination
    total_events_query = (
        db.query(func.count(Event.id))
        .filter(Event.host_id == account_id)
    )
    total_count = total_events_query.scalar()
    total_pages = (total_count + limit - 1) // limit

    return {
        "events": [
            {
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "date": event.date.isoformat()
            }
            for event in events
        ],
        "totalPages": total_pages
    }
@app.get("/events/", response_model=List[EventOut])
def get_events(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    events = db.query(Event).offset(skip).limit(limit).all()
    return events

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
