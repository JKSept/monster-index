import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function DexTab({ gen, user }) {
  const [pokemon, setPokemon] = useState([])
  const [caughtIds, setCaughtIds] = useState(new Set())

  // Fetch Pokémon list
  useEffect(() => {
    async function fetchPokemon() {
      const tableName = gen === 1 ? 'gen1_pokemon' : 'gen2_pokemon'
      const { data, error } = await supabase.from(tableName).select('*')
      if (error) {
        console.error(error)
      } else {
        setPokemon(data)
      }
    }
    fetchPokemon()
  }, [gen])

  // Fetch caught Pokémon for this user + gen
  useEffect(() => {
    async function fetchCaught() {
      if (!user) return
      const tableName = gen === 1 ? 'caught_gen1' : 'caught_gen2'
      const { data, error } = await supabase
        .from(tableName)
        .select('pokemon_id')
        .eq('user_id', user.id)

      if (error) {
        console.error(error)
        return
      }

      setCaughtIds(new Set(data.map(row => row.pokemon_id)))
    }
    fetchCaught()
  }, [gen, user])

  async function toggleCaught(pokeId) {
    if (!user) return

    const tableName = gen === 1 ? 'caught_gen1' : 'caught_gen2'
    const isCaught = caughtIds.has(pokeId)

    if (isCaught) {
      // Remove from caught
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('user_id', user.id)
        .eq('pokemon_id', pokeId)

      if (error) {
        console.error(error)
        return
      }

      // Update local state
      const next = new Set(caughtIds)
      next.delete(pokeId)
      setCaughtIds(next)
    } else {
      // Add to caught
      const { error } = await supabase.from(tableName).insert({
        user_id: user.id,
        pokemon_id: pokeId,
      })

      if (error) {
        console.error(error)
        return
      }

      const next = new Set(caughtIds)
      next.add(pokeId)
      setCaughtIds(next)
    }
  }

  return (
    <div className="dex-grid">
      {pokemon.map(p => {
        const isCaught = caughtIds.has(p.id)
        return (
          <div
            key={p.id}
            className={`dex-card ${isCaught ? 'caught' : ''}`}
            onClick={() => toggleCaught(p.id)}
          >
            <img src={p.image_url} alt={p.name} width={96} />
            <p id="card-text">#{p.id}</p> <p>{p.name}</p>
          </div>
        )
      })}
    </div>
  )
}



