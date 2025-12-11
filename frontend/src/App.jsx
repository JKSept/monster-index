import { useState, useEffect } from 'react'
import DexTab from './DexTab.jsx'
import AuthPanel from './AuthPanel.jsx'
import { supabase } from './supabaseClient'
import logo from './assets/logo.png'

function App() {
  const [activeGen, setActiveGen] = useState(1)
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'dark'
  )
  const [user, setUser] = useState(null)

  // Theme handling
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Auth: load current user on startup & listen for changes
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user ?? null)
    }
    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      {/* theme toggle in top-right corner */}
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      <div className="app-container">
        <h1><img src={logo} /></h1>

        {/* Show user/email or prompt */}
        <p style={{ marginBottom: '1rem' }}>
          {user ? `Signed in as ${user.email}` : 'Sign in to track your Pokédex'}
        </p>

        {/* Simple auth UI */}
        {!user && <AuthPanel />}

        {/* Only show dex if logged in */}
        {user && (
          <>
            <div className="tab-nav">
              <button
                className={activeGen === 1 ? 'tab active' : 'tab'}
                onClick={() => setActiveGen(1)}
              >
                Kanto (Gen 1)
              </button>
              <button
                className={activeGen === 2 ? 'tab active' : 'tab'}
                onClick={() => setActiveGen(2)}
              >
                Johto (Gen 2)
              </button>
            </div>

            <DexTab gen={activeGen} user={user} />
          </>
        )}
      </div>
    </>
  )
}

export default App
