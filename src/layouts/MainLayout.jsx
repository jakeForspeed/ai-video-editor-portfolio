import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    // <div className="min-h-screen bg-slate-950 text-white">
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400/30 selection:text-white">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout