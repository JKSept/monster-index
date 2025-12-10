import { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase.from('gen1_pokemon').select('*')
      console.log('Gen1 Pokémon:', data, error)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Monster Index</h1>
      <p>Check the console for Pokémon data</p>
    </div>
  )
}

export default App

