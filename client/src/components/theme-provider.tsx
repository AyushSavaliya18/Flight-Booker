import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "skybook-theme",
}: {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
  storageKey?: string;
}) {
  const [theme, setTheme] = React.useState<"light" | "dark">(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(storageKey);
        if (saved === "light" || saved === "dark") return saved;
      }
      return defaultTheme;
    }
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
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-9 w-9 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm group"
      data-testid="button-toggle-theme"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all text-amber-500 group-hover:rotate-45 ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all text-indigo-600 dark:text-blue-400 group-hover:-rotate-12 ${theme === 'light' ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
