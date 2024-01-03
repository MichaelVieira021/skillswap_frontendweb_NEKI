import { BrowserRouter } from "react-router-dom"
import { LoginProvider } from "./contexts/LoginContext"
import AppRouter from "./routes"

function App() {

  return (
    <>
      <BrowserRouter>
        <LoginProvider>
          <AppRouter/>
        </LoginProvider>
      </BrowserRouter>
    </>
  )
}

export default App
