"use client"
import React, { createContext, useContext, useState } from 'react'
let themeContext = createContext()

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => setTheme((theme) => (theme == "light" ? "dark" : "light"))

  return (
    <div>
      <themeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </themeContext.Provider>
    </div>
  )
}

export default ThemeContext

export const useTheme = () => useContext(themeContext)