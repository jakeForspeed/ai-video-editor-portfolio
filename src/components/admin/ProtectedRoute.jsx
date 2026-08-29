import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { getCurrentAdmin } from "../../services/authService"


function ProtectedRoute() {

  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] =
    useState(false)


  useEffect(() => {

    async function checkAuthentication() {

      try {

        const admin =
          await getCurrentAdmin()

        if (admin) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }

      } catch (error) {

        console.error(
          "Authentication check failed:",
          error
        )

        setAuthenticated(false)

      } finally {

        setLoading(false)

      }

    }


    checkAuthentication()

  }, [])


  /*
   * Wait until Supabase finishes
   * checking the current session.
   */

  if (loading) {

    return (

      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-950
      ">

        <div className="text-center">

          <div className="
            mx-auto
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-white/10
            border-t-cyan-400
          " />

          <p className="
            mt-5
            text-sm
            text-slate-500
          ">
            Checking authentication...
          </p>

        </div>

      </div>

    )

  }


  /*
   * Not authenticated
   * → send user to login.
   */

  if (!authenticated) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    )

  }


  /*
   * Authenticated
   * → render the protected admin routes.
   */

  return <Outlet />

}


export default ProtectedRoute
