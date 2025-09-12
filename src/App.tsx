import { BrowserRouter, Route,Routes } from "react-router-dom"
import { Layout } from "./pages/layout"
import { AuthPage } from "./pages/Auth/AuthPage"

function App() {

  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="auth" element={<AuthPage />}>
          
        </Route>
      </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App
