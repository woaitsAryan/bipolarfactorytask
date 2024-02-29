import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv('MONGO_URI'))
mongo_db = client['your_database_name']

flight_collection = mongo_db['flights']
user_collection = mongo_db['users']