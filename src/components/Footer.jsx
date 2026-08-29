import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}

          <div>
            <Link
              to="/"
              className="text-lg font-bold tracking-tight"
            >
              JAKE<span className="text-cyan-400">.</span>
            </Link>

            <p className="mt-2 text-sm text-slate-500">
              AI Video Editor & Creative
            </p>
          </div>


          {/* Links */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

            <Link
              to="/portfolio"
              className="transition hover:text-white"
            >
              Work
            </Link>

            <Link
              to="/about"
              className="transition hover:text-white"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>

          </div>

        </div>


        <div className="mt-10 border-t border-white/10 pt-6">

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Jake. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer