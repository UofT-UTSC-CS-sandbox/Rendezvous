from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, select
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from databases import Database
from pydantic import BaseModel
from typing import Annotated, List
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

""" Table for friends relationship.
    The relationship should be maintained to be symetriv.
    Ie, user1 is a friend of user2 iff user2 is a friend
    of user1.
"""
Account_to_account = Table(
    "account_to_account",
    Base.metadata,
    Column("friend_id", Integer, ForeignKey("accounts.id"), primary_key=True),
    Column("right_friend_id", Integer, ForeignKey("accounts.id"), primary_key=True),
)

""" Table for friends request relationship.
    The relationship should be maintained to be antisymetric.
"""
friend_request_table = Table(
    "friend_request_table",
    Base.metadata,
    Column("friend_id", Integer, ForeignKey("accounts.id"), primary_key=True),
    Column("right_friend_id", Integer, ForeignKey("accounts.id"), primary_key=True),
)

class FriendCompressedProfile(BaseModel):
    username: str
    profile_image_src: str

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)

    # Friend m2m relationship.
    # Database updates should maintatin symmetry.
    # primary and secondary join needed to distinguish
    # between the direction of relations.
    # See sqlalchemy documentation for details.
    right_friends: Mapped[List["Account"]] = relationship(
        "Account",
        secondary=Account_to_account,
        primaryjoin= (id == Account_to_account.c.friend_id),
        secondaryjoin= (id == Account_to_account.c.right_friend_id),
        back_populates="friends",
    )
    friends: Mapped[List["Account"]] = relationship(
        "Account",
        secondary=Account_to_account,
        primaryjoin= (id == Account_to_account.c.right_friend_id),
        secondaryjoin= (id == Account_to_account.c.friend_id),
        back_populates="right_friends",
    )

    friend_requests_recieved: Mapped[List["Account"]] = relationship(
        "Account",
        secondary=friend_request_table,
        primaryjoin= (id == friend_request_table.c.friend_id),
        secondaryjoin= (id == friend_request_table.c.right_friend_id),
        back_populates="friend_requests_sent",
    )
    friend_requests_sent: Mapped[List["Account"]] = relationship(
        "Account",
        secondary=friend_request_table,
        primaryjoin= (id == friend_request_table.c.right_friend_id),
        secondaryjoin= (id == friend_request_table.c.friend_id),
        back_populates="friend_requests_recieved",
    )

    def __repr__(self) -> str:
        return f"Account(id={self.id!r}, email={self.email!r})"
    
    def toFriendCompressedProfile(self) -> FriendCompressedProfile:
        # currently a fixes image_src is returned.
        # Once profile feature is implemented, this should be changed.
        return FriendCompressedProfile(username = self.username, profile_image_src="https://www.w3schools.com/w3images/avatar2.png")
        
    

engine = create_engine(DATABASE_URL, echo=True)
# engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Below line can be commented out to save schemes between runs.
Base.metadata.drop_all(bind=engine)

Base.metadata.create_all(bind=engine)

def get_db():
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
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db: Session, username: str)->Account:
    account = db.query(Account).filter(Account.username == username).first()
    return account

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
    account = get_user(db, token_data.username)
    if account is None:
        raise credentials_exception
    return account

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

class UserIn(BaseModel):
    username: str
    password: str
    email: str = None

class UserOut(BaseModel):
    id: int
    username: str
    email: str

class UsernameIn(BaseModel):
    username: str

""" Returns (first) user with matching username.

    Throws HTTPException if no matching user exists.
"""
def get_user_from_usernameIn(usernameIn: UsernameIn, db: Session = Depends(get_db)):
    user = get_user(db, usernameIn.username)
    if user == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User does not exist.") 
    return user

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
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
    existing_user = db.query(Account).filter((Account.username == user.username) | (Account.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists!")
    else:
        new_user = Account(username=user.username, password=get_password_hash(user.password), email=user.email)
        db.add(new_user)
        db.commit()
        return JSONResponse(content={"message": "You have successfully registered!"})
    
""" Sends new friend request to the user with matching username.

    If the friend_user has already sent a friend request to the
    calling user, the users are added as friends.
    Otherwise, sends a friend request.

    Throws HTTPException if:
        - friend does not exist
        - authentication for current user fails
        - current user is attempting to add themselves as a friend
        - friend is already friends with the current user.
        - the current user has already sent a friend request to friend. """
@app.post("/sendfriendrequest")
def send_friend_request (friend_user: Account = Depends(get_user_from_usernameIn),
                current_user: Account = Depends(get_current_user),
                db: Session = Depends(get_db)):
    if friend_user == current_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot friend yourself.") 
    if friend_user in current_user.friends:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is already a friend.") 
    if friend_user in current_user.friend_requests_sent:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend request to user already sent.") 
    # friend has already sent a friend request to the current user
    if friend_user in current_user.friend_requests_recieved:
        friend_user.friend_requests_sent.remove(current_user)
        friend_user.friends.append(current_user)
        current_user.friends.append(friend_user)
        db.commit()
        return JSONResponse(content={"message": "Friend successfully added!"})
    # creates new friend request
    current_user.friend_requests_sent.append(friend_user)
    db.commit()
    return JSONResponse(content={"message": "Friend request sent!"})

""" Denies existing friend request to the current user from the friend_user.

    Throws HTTPException if:
        - friend does not exist
        - authentication for current user fails """
@app.post("/denyfriendrequest")
def deny_friend_request (friend_user: Account = Depends(get_user_from_usernameIn),
                current_user: Account = Depends(get_current_user),
                db: Session = Depends(get_db)):
    current_user.friend_requests_recieved.remove(friend_user)
    db.commit()
    return JSONResponse(content={"message": "Friend request denied."})

""" Removes friend with matching username from friends list for
    the current user.

    Throws HTTPException if:
        - friend does not exist
        - authentication for current user fails. """
@app.post("/removefriend")
def remove_friend (friend_user: Account = Depends(get_user_from_usernameIn),
                current_user: Account = Depends(get_current_user),
                db: Session = Depends(get_db)):
    current_user.friends.remove(friend_user)
    friend_user.friends.remove(current_user)
    db.commit()
    return JSONResponse(content={"message": "Friend removed."})

""" Denies existing friend request to the current user from the friend_user.

    Throws HTTPException if:
        - friend does not exist.
        - authentication for current user fails. """
@app.post("/cancelfriendrequest")
def remove_friend (friend_user: Account = Depends(get_user_from_usernameIn),
                current_user: Account = Depends(get_current_user),
                db: Session = Depends(get_db)):
    current_user.friend_requests_sent.remove(friend_user)
    db.commit()
    return JSONResponse(content={"message": "Friend Request removed."})
    

""" Adds the (first) user with username=username as
    a friend of the current_user.
    
    friend user should have sent friend request to current user.
    Otherwise, this will simply sent a friend request to the friend_user.

    Throws HTTPException if:
        - friend does not exist.
        - authentication for current user fails. """
@app.post("/addfriend")
def add_friend (friend_user: Account = Depends(get_user_from_usernameIn),
                current_user: Account = Depends(get_current_user),
                db: Session = Depends(get_db)):
    return send_friend_request(friend_user, current_user, db)

""" Returns a json array of the current user's friends.

    Throws HTTPException if authentication fails. """
@app.post("/friends", response_model=List[FriendCompressedProfile])
def get_friends(current_user: Account = Depends(get_current_user), db: Session = Depends(get_db)):
    return [friend_account.toFriendCompressedProfile() for friend_account in current_user.friends]

""" Returns a json array of the current user's sent friend requests.

    Throws HTTPException if authentication fails. """
@app.post("/friendrequestssent", response_model=List[FriendCompressedProfile])       
def get_friend_requests_sent(current_user: Account = Depends(get_current_user), db: Session = Depends(get_db)):
    return [friend_account.toFriendCompressedProfile() for friend_account in current_user.friend_requests_sent]

""" Returns a json array of the current user's recieved friend requests.

    Throws HTTPException if authentication fails. """
@app.post("/friendrequestsrecieved", response_model=List[FriendCompressedProfile])  
def get_friend_requests_recieved(current_user: Account = Depends(get_current_user), db: Session = Depends(get_db)):
    return [friend_account.toFriendCompressedProfile() for friend_account in current_user.friend_requests_recieved]

@app.get("/events")
def get_events(current_user: Annotated[Account, Depends(get_current_user)]):
    return current_user

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
