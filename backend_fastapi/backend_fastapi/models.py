# models.py

from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from .database import Base

event_attendees = Table(
    'event_attendees',
    Base.metadata,
    Column('event_id', Integer, ForeignKey('events.id'), primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    attending = relationship("Event", secondary=event_attendees, back_populates="attendees")
    events = relationship("Event", back_populates="host")

class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    host_id = Column(Integer, ForeignKey('users.id'))
    host = relationship("User", back_populates="events")
    attendees = relationship("User", secondary=event_attendees, back_populates="attending")
