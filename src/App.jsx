import Nav from "./shared/Nav/Nav"
import { Outlet } from "react-router-dom"
import FooterPart from "./shared/FooterPart/FooterPart"

function App() {

  return (
    <>
      <div className=" roboto">
        <Nav />
        <Outlet />
        <FooterPart />
      </div>
    </>
  )
}

export default App
