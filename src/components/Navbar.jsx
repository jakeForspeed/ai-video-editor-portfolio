import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Work",
      path: "/portfolio",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "About",
      path: "/about",
    },
  ]

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-xl font-bold tracking-tight text-white"
        >
          JAKE<span className="text-cyan-400">.</span>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </div>


        {/* Desktop Contact */}
        <Link
          to="/contact"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 md:block"
        >
          Let's Talk
        </Link>


        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

      </div>


      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">

          <div className="mx-auto max-w-7xl px-6 py-5">

            <div className="flex flex-col gap-2">

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Let's Talk
              </Link>

            </div>

          </div>

        </div>
      )}

    </nav>
  )
}

export default Navbar