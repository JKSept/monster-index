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

def seed_gen2():
    with open("../data/gen2_pokemon.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    print("Seeding Gen 2 Pokémon...")
    supabase.table("gen2_pokemon").insert(data).execute()
    print("Gen 2 done!")

seed_gen2()