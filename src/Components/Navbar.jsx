import React from 'react'
import '../App.css'
import { useTheme } from '../Utils/ThemeContext';

function Navbar() {
  const {toggleTheme } = useTheme();
  return (
    <nav  >
        <div>
            <h1 >hello</h1>
        </div>
        <div>
            nav items
            <button onClick={toggleTheme}>Toggle Theme</button>

        </div>

    </nav>
  )
}

export default Navbar