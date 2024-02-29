
from .user import UserLogin, User, UserInDB
import sys
sys.path.append("..")
from backend.auth.helpers import authenticate_user, create_access_token, get_password_hash
from datetime import timedelta
import os
from fastapi import HTTPException, status, APIRouter
from backend.initializers.db import user_collection

authRouter = APIRouter()

@authRouter.post("/login")
async def login(
    form_data: UserLogin
):
    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user['_id'])}, expires_delta=access_token_expires
    )
    
    return {"token": access_token}

@authRouter.post("/adminlogin")
async def admin_login(
    form_data: UserLogin
):
    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if user['isAdmin'] == False:
        raise HTTPException(
            status_code=400,
            detail="User is not an admin",
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user['_id'])}, expires_delta=access_token_expires
    )
    
    return {"token": access_token}


@authRouter.post("/signup")
async def create_user(user: User):
    existing_user = user_collection.find_one(
        {"$or": [{"email": user.email}, {"phone": user.phoneNumber}, ]}
    )
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User with this email, phone already exists",
    )
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict.pop('password', None)
    user_in_db = UserInDB(**user_dict, hashed_password=hashed_password)
    result = user_collection.insert_one(user_in_db.dict())
    access_token_expires = timedelta(minutes=30)

    access_token = create_access_token(
        data={"sub": str(result.inserted_id)}, expires_delta=access_token_expires
    )
    
    return {"token": access_token}