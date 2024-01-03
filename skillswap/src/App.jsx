import { BrowserRouter } from "react-router-dom"
import { Login } from "./pages/Login"
import { LoginProvider } from "./contexts/LoginContext"

function App() {

  return (
    <>
      <BrowserRouter>
        <LoginProvider>
          <Login/>
        </LoginProvider>
      </BrowserRouter>
    </>
  )
}

export default App
