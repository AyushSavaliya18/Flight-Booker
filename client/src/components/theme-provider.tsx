import * as React from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "skybook-theme",
}) {
  const [theme, setTheme] = React.useState<"light" | "dark">(
    () => (localStorage.getItem(storageKey) as "light" | "dark") || defaultTheme
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: "light" | "dark") => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    toggleTheme: () => {
      const newTheme = theme === "light" ? "dark" : "light"
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

const ThemeContext = React.createContext<{
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  toggleTheme: () => void
} | null>(null)

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      data-testid="button-toggle-theme"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'light' ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
