import json
import os
from dotenv import load_dotenv
from supabase import create_client

# Load .env variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def seed_gen1():
    with open("../data/gen1_pokemon.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    print("Seeding Gen 1 Pokémon...")
    supabase.table("gen1_pokemon").insert(data).execute()
    print("Gen 1 done!")

seed_gen1()