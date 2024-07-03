# schemas.py

from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None

class EventCreate(EventBase):
    host_id: int
    attendee_ids: List[int] = []

class EventOut(EventBase):
    id: int
    host: UserOut
    attendees: List[UserOut] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
