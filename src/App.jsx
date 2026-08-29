import { Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import PublicLayout from "./layouts/PublicLayout"

import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AddVideo from "./pages/admin/AddVideo"
import EditVideo from "./pages/admin/EditVideo"

import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import VideoDetails from "./pages/VideoDetails"
import Services from "./pages/Services"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        <Route
          path="/portfolio/:slug"
          element={<VideoDetails />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/videos/new"
          element={<AddVideo />}
        />

        <Route
          path="/admin/videos/:id/edit"
          element={<EditVideo />}
        />

      </Route>

    </Routes>
  )
}

export default App