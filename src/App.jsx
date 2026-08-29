import { Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import AuthLayout from "./layouts/AuthLayout"

import ProtectedRoute from "./components/admin/ProtectedRoute"

import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AddVideo from "./pages/admin/AddVideo"
import EditVideo from "./pages/admin/EditVideo"
import AdminMessages from "./pages/admin/AdminMessages"
import AdminPortfolio from "./pages/admin/AdminPortfolio"

import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import VideoDetails from "./pages/VideoDetails"
import Services from "./pages/Services"
import About from "./pages/About"
import Contact from "./pages/Contact"


function App() {

  return (

    <Routes>


      {/* ========================================
          PUBLIC WEBSITE
      ======================================== */}

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

      </Route>



      {/* ========================================
          AUTHENTICATION
      ======================================== */}

      <Route element={<AuthLayout />}>

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

      </Route>



      {/* ========================================
          PROTECTED ADMIN
      ======================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* Dashboard */}

          <Route
            index
            element={<AdminDashboard />}
          />


          {/* Portfolio */}

          <Route
            path="portfolio"
            element={<AdminPortfolio />}
          />


          {/* Add Video */}

          <Route
            path="portfolio/new"
            element={<AddVideo />}
          />


          {/* Edit Video */}

          <Route
            path="portfolio/:id/edit"
            element={<EditVideo />}
          />


          {/* Messages */}

          <Route
            path="messages"
            element={<AdminMessages />}
          />

        </Route>

      </Route>


    </Routes>

  )

}


export default App
