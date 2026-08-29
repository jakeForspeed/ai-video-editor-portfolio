import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"


function PublicLayout() {

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main>
        <Outlet />
      </main>

    </div>
  )
}


export default PublicLayout