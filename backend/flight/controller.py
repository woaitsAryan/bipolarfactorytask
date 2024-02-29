import sys
sys.path.append("..")
from fastapi import APIRouter, Depends, Body, HTTPException
from backend.middleware.protect import protect
from bson import ObjectId
from backend.initializers.db import user_collection
from backend.initializers.db import flight_collection
from typing import Optional
from backend.model.flight import Flight

flightRouter = APIRouter()

@flightRouter.post('/addflight')
async def add_flight(payload: dict = Body(...), id: str = Depends(protect)): # type: ignore
    user = user_collection.find_one({"_id": ObjectId(id)})    
    if user is None:
        raise HTTPException(
            status_code=400,
            detail="User not found"
    )
    if user['isAdmin'] == False:
        raise HTTPException(
            status_code=400,
            detail="User can't add flights"
    )
        
    payload['seats'] = int(payload['seats'])
   
    flight_in_db = Flight(**payload)
    flight_collection.insert_one(flight_in_db.dict())
    return {"message": "Flight added successfully"}


@flightRouter.delete('/deleteflight/{flight_id}/')
async def delete_flight(flight_id: str, id: str = Depends(protect)):
    user = user_collection.find_one({"_id": ObjectId(id)})    
    if user is None:
        raise HTTPException(
            status_code=400,
            detail="User not found"
    )
    if user['isAdmin'] == False:
        raise HTTPException(
            status_code=400,
            detail="User can't delete flights"
    )
    flight = flight_collection.find_one({"_id": ObjectId(flight_id)})
    if flight is None:
        raise HTTPException(
            status_code=400,
            detail="Flight not found"
    )
    flight_collection.delete_one({"_id": ObjectId(flight_id)})
    return {"message": "Flight deleted successfully"}

@flightRouter.get('/flights')
async def get_flights(from_date: Optional[str] = None, to_date: Optional[str] = None,
                      from_time: Optional[str] = None, to_time: Optional[str] = None,
                      departure: Optional[str] = None, arrival: Optional[str] = None):
    query = {}
    if from_date and to_date:
        query['fromDate'] = {'$gte': from_date, '$lte': to_date}
        query['toDate'] = {'$gte': from_date, '$lte': to_date}
    if from_time and to_time:
        query['fromTime'] = {'$gte': from_time, '$lte': to_time}
        query['toTime'] = {'$gte': from_time, '$lte': to_time}
    if departure:
        query['departure'] = departure
    if arrival:
        query['arrival'] = arrival
    flights = list(flight_collection.find(query).sort('price'))
    for flight in flights:
        flight['_id'] = str(flight['_id'])  # Convert ObjectId to string
    return {"flights": flights}

@flightRouter.patch('/bookflight/{flight_id}/')
async def book_slot(flight_id: str, id: str = Depends(protect)): # type: ignore
    user = user_collection.find_one({"_id": ObjectId(id)})    
    if user is None:
        raise HTTPException(
            status_code=400,
            detail="User not found"
    )
    flight = flight_collection.find_one({"_id": ObjectId(flight_id)})
    if flight is None:
        raise HTTPException(
            status_code=400,
            detail="Flight not found"
    )
    if flight['seats'] == 0:
        raise HTTPException(
            status_code=400,
            detail="No available seats"
    )
    print(flight)
    flight['seats'] = int(flight['seats']) - 1
    user_collection.update_one({"_id": ObjectId(id)}, {"$push": {"bookedFlights": flight}})
    flight_collection.update_one({"_id": ObjectId(flight_id)}, {"$set": flight})
    
    return {"message": "Flight booked successfully"}

@flightRouter.get('/myflights')
async def get_my_flights(id: str = Depends(protect)): # type: ignore
    user = user_collection.find_one({"_id": ObjectId(id)})    
    if user is None:
        raise HTTPException(
            status_code=400,
            detail="User not found"
    )
    flights = user['bookedFlights']
    for flight in flights:
        flight['_id'] = str(flight['_id'])  # Convert ObjectId to string
    return {"flights": user['bookedFlights']}