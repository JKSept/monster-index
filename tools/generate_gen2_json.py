import requests
import json
import time

POKEDEX_URL = "https://pokeapi.co/api/v2/pokedex/3"
SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"


def capitalize_name(name: str) -> str:
    return name.capitalize()


def get_national_id(species_name: str) -> int:
    url = f"https://pokeapi.co/api/v2/pokemon-species/{species_name}"
    resp = requests.get(url)

    if resp.status_code != 200:
        raise Exception(f"Failed to fetch species data for {species_name}")

    data = resp.json()
    return data["id"]


def main():
    print("Fetching Johto Pokédex...")

    resp = requests.get(POKEDEX_URL)
    if resp.status_code != 200:
        raise Exception("Failed to fetch Johto Pokédex")

    data = resp.json()
    entries = data["pokemon_entries"]

    output = []

    for e in entries:
        regional_id = e["entry_number"]
        raw_name = e["pokemon_species"]["name"]

        print(f"Processing #{regional_id} {raw_name}...")

        national_id = get_national_id(raw_name)

        pokemon = {
            "id": regional_id,
            "name": capitalize_name(raw_name),
            "image_url": f"{SPRITE_BASE}{national_id}.png",
            "gen": '2'


        }

        output.append(pokemon)

        # polite delay
        time.sleep(0.15)

    with open("../data/gen2_pokemon.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"Done. Generated {len(output)} Pokémon for Gen 2.")


if __name__ == "__main__":
    main()
