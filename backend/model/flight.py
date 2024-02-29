from pydantic import BaseModel

class Flight(BaseModel):
    planeType: str
    departure: str
    arrival: str
    fromDate : str
    fromTime: str
    toDate: str
    toTime: str
    price: str
    seats: int = 60
    company: str
