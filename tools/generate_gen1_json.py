import requests
import json

BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
pokemon_list = []

for i in range(1, 152):
    print(f"Fetching Pokemon {i}...")
    res = requests.get(f"{BASE_URL}{i}")
    data = res.json()

    pokemon = {
        "id": i,
        "name": data["name"].capitalize(),

        "image_url": data["sprites"]["front_default"]
    }

    pokemon_list.append(pokemon)

with open("../data/gen1_pokemon.json", "w") as f:
    json.dump(pokemon_list, f, indent=2)

print("Gen 1 JSON generated!")
