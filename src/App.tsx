import { BrowserRouter, Route,Routes } from "react-router-dom"
import { Layout } from "./pages/layout"
import { AuthPage } from "./pages/Auth/AuthPage"
import { PanelPage } from "./pages/PanelPage/PanelPage"
import { EditorPage } from "./pages/EditorPage/EditorPage"
import { EditCatalog } from "./widgets/EditCatalog"
import { EditCategory } from "./widgets/EditCategory"
import { RequireAuth } from "./components/lib/RequireAuth"







function App() {
 


  return (
    <BrowserRouter>
    <Layout>
      <Routes>
            <Route path="login" element={<AuthPage />}></Route>  
            <Route element={<RequireAuth/>}>
                <Route path="panel" element={<PanelPage/>}></Route>
                <Route path="editor" element={<EditorPage />}>
                      <Route path="catalog" element={<EditCatalog/>}></Route>
                      <Route path="categories" element={<EditCategory/>}></Route>
                      <Route path="tags" element={<h1>tags</h1>}></Route>
                </Route>  
 
            </Route>
           
      </Routes>
      </Layout>
    
    </BrowserRouter>
  )
}




export default App


