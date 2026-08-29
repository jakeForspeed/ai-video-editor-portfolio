import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { supabase } from "../lib/supabase"


const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
        />

        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
        />

        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
        />

        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
        />
      </svg>
    ),
  },

  {
    name: "Portfolio",
    href: "/admin/portfolio",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 4V2h8v2"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18"
        />
      </svg>
    ),
  },

  {
    name: "Messages",
    href: "/admin/messages",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l9 6 9-6"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
]


function AdminLayout() {

  const navigate = useNavigate()


  async function handleLogout() {

    try {

      await supabase.auth.signOut()

      navigate("/admin/login", {
        replace: true,
      })

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      )

    }

  }


  return (

    /*
     * h-screen + overflow-hidden
     *
     * Keeps the admin application locked
     * to the viewport height.
     *
     * The sidebar will never scroll.
     */

    <div
      className="
        h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >

      <div className="flex h-full">


        {/* ========================================
            SIDEBAR
        ======================================== */}

        <aside
          className="
            hidden
            h-full
            w-64
            shrink-0
            border-r
            border-white/10
            bg-slate-950
            lg:flex
            lg:flex-col
          "
        >


          {/* Logo */}

          <div
            className="
              flex
              h-20
              shrink-0
              items-center
              border-b
              border-white/10
              px-6
            "
          >

            <div>

              <p className="text-sm font-semibold tracking-wide">

                Jake

                <span className="text-cyan-400">
                  .
                </span>

              </p>


              <p className="mt-0.5 text-xs text-slate-500">
                AI Video Portfolio
              </p>

            </div>

          </div>



          {/* Navigation */}

          <nav
            className="
              flex-1
              overflow-y-auto
              p-4
            "
          >

            <div className="space-y-1">

              {navigation.map((item) => (

                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/admin"}
                >

                  {({ isActive }) => (

                    <motion.div
                      whileHover={{
                        x: 3,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={`
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-medium
                        transition

                        ${
                          isActive
                            ? "bg-white text-slate-950"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >

                      {item.icon}

                      {item.name}

                    </motion.div>

                  )}

                </NavLink>

              ))}

            </div>

          </nav>



          {/* Bottom / Logout */}

          <div
            className="
              shrink-0
              border-t
              border-white/10
              p-4
            "
          >

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-slate-400
                transition
                hover:bg-red-400/10
                hover:text-red-400
              "
            >

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 17l5-5-5-5"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H3"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 19V5a2 2 0 00-2-2h-6"
                />

              </svg>

              Logout

            </button>

          </div>

        </aside>



        {/* ========================================
            MAIN AREA
        ======================================== */}

        <main
          className="
            min-w-0
            flex-1
            overflow-y-auto
          "
        >


          {/* Mobile Header */}

          <header
            className="
              flex
              h-20
              shrink-0
              items-center
              justify-between
              border-b
              border-white/10
              px-6
              lg:hidden
            "
          >

            <div>

              <p className="text-sm font-semibold">

                Jake

                <span className="text-cyan-400">
                  .
                </span>

              </p>


              <p className="text-xs text-slate-500">
                Admin
              </p>

            </div>


            <button
              type="button"
              onClick={handleLogout}
              className="
                rounded-lg
                px-3
                py-2
                text-sm
                text-slate-400
                transition
                hover:bg-white/5
                hover:text-white
              "
            >
              Logout
            </button>

          </header>



          {/* Page Content */}

          <div
            className="
              mx-auto
              max-w-7xl
              px-6
              py-8
              lg:px-10
              lg:py-10
            "
          >

            <Outlet />

          </div>


        </main>

      </div>

    </div>

  )
}


export default AdminLayout
