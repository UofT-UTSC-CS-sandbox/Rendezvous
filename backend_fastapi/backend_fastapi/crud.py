# crud.py

from sqlalchemy.orm import Session
from .models import User, Event
from .schemas import UserCreate, EventCreate
from passlib.context import CryptContext

# Password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, username: str) -> User:
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str) -> User:
    user = get_user(db, username)
    if not user or not verify_password(password, user.password):
        return None
    return user

def get_event(db: Session, event_id: int) -> Event:
    return db.query(Event).filter(Event.id == event_id).first()

def create_event(db: Session, event: EventCreate) -> Event:
    db_event = Event(title=event.title, description=event.description, host_id=event.host_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    for attendee_id in event.attendee_ids:
        attendee = get_user_by_id(db, attendee_id)
        if attendee:
            db_event.attendees.append(attendee)
    db.commit()

    return db_event

def add_attendee_to_event(db: Session, event_id: int, user_id: int) -> Event:
    event = get_event(db, event_id)
    user = get_user_by_id(db, user_id)
    if event and user:
        event.attendees.append(user)
        db.commit()
        return event
    else:
        return None
