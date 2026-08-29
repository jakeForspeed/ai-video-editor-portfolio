import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { loginAdmin } from "../../services/authService"

function AdminLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState(
    "robertjakematao@gmail.com"
  )

  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")


  async function handleSubmit(event) {

    event.preventDefault()

    setError("")
    setLoading(true)

    try {

      await loginAdmin(
        email.trim(),
        password
      )

      navigate("/admin/dashboard", {
        replace: true,
      })

    } catch (error) {

      console.error(error)

      setError(
        "Invalid email or password."
      )

    } finally {

      setLoading(false)

    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center">

          <div className="text-2xl font-bold">
            JAKE<span className="text-cyan-400">.</span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Admin Portal
          </p>

        </div>


        {/* Card */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8">

          <h1 className="text-2xl font-bold">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your portfolio.
          </p>


          {error && (
            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
              />

            </div>


            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
              />

            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default AdminLogin