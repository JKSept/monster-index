import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function DexTab({ gen }) {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    async function fetchPokemon() {
      let tableName = gen === 1 ? 'gen1_pokemon' : 'gen2_pokemon'
      let { data, error } = await supabase.from(tableName).select('*')
      if (error) console.error(error)
      else setPokemon(data)
    }
    fetchPokemon()
  }, [gen])

  return (
    <div className="dex-grid">
      {pokemon.map(p => (
        <div key={p.id} className="dex-card">
          <img src={p.image_url} alt={p.name} width={96} />
          <p id="card-text">#{p.id}</p> <p>{p.name}</p>
        </div>
      ))}
    </div>
  )
}
