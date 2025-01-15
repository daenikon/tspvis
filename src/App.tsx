import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

import Page from "./app/dashboard/page"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Page/>
    </ThemeProvider>
  )
}

export default App

