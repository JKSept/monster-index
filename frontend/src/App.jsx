import { useState, useEffect } from 'react'
import DexTab from './DexTab'
import logo from './assets/logo.png'

function App() {
  const [activeGen, setActiveGen] = useState(1)
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app-container">
      <h1><img src={logo} /></h1>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      <div className="tab-nav">
        <button className={activeGen === 1 ? "tab active" : "tab"} onClick={() => setActiveGen(1)}>
          Kanto (Gen 1)
        </button>
        <button className={activeGen === 2 ? "tab active" : "tab"} onClick={() => setActiveGen(2)}>
          Johto (Gen 2)
        </button>
      </div>

      <DexTab gen={activeGen} />
    </div>
  )
}

export default App
