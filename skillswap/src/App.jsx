import { BrowserRouter } from "react-router-dom"
import { LoginProvider } from "./contexts/LoginContext"
import AppRouter from "./routes"
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
          <LoginProvider>
            <AppRouter/>
          </LoginProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
