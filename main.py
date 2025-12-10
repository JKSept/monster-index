
from fastapi import FastAPI
from fastapi import Request
from supabase import create_client
import os
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/gen1")
def get_gen1():
    result = supabase.table("gen1_pokemon").select("*").execute()
    return result.data

@app.get("/gen2")
def get_gen2():
    result = supabase.table("gen2_pokemon").select("*").execute()
    return result.data

@app.get("/me")
def get_me(request: Request):
    return {"status": "auth route active"}

