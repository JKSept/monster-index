from http.client import responses

from fastapi import FastAPI
from supabase import create_client
import os
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app.get("/monsters")
def get_all_monsters():
    response = supabase.table("monsters").select("*").execute()
    return response.data

