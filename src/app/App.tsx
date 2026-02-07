import { ThemeProvider } from './providers/ThemeProvider'
import { MainRoutes } from './MainRoutes'

function App() {

    return (
        <ThemeProvider>
            <MainRoutes />
        </ThemeProvider>
    )
}

export default App
