from pydantic import BaseModel
from typing import List
import sys
sys.path.append("..")
from backend.model.flight import Flight


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    phoneNumber: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str
    
class UserInDB(BaseModel):
    firstName: str
    lastName: str
    email: str
    phoneNumber: str
    hashed_password: str
    isAdmin: bool = False
    bookedFlights: List[Flight] = []