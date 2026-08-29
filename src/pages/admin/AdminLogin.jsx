
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { loginAdmin } from "../../services/authService"


function AdminLogin() {

  const navigate = useNavigate()


  const [email, setEmail] = useState(
    "robertjakematao@gmail.com"
  )

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")



  async function handleSubmit(event) {

    event.preventDefault()

    setError("")
    setLoading(true)


    try {

      await loginAdmin(
        email.trim(),
        password
      )


      navigate("/admin", {
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

    <div className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      p-7
      shadow-2xl
      shadow-black/20
      backdrop-blur-xl
      sm:p-9
    ">


      {/* Header */}

      <div>

        <p className="
          text-xs
          font-semibold
          uppercase
          tracking-[0.3em]
          text-cyan-400
        ">
          Private Area
        </p>


        <h1 className="
          mt-3
          text-3xl
          font-bold
          text-white
        ">
          Welcome back
        </h1>


        <p className="
          mt-2
          text-sm
          leading-6
          text-slate-500
        ">
          Sign in to manage your video portfolio.
        </p>

      </div>



      {/* Error */}

      {error && (

        <div className="
          mt-6
          rounded-xl
          border
          border-red-400/20
          bg-red-400/5
          px-4
          py-3
          text-sm
          text-red-300
        ">
          {error}
        </div>

      )}



      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >


        {/* Email */}

        <div>

          <label
            htmlFor="email"
            className="
              text-sm
              font-medium
              text-slate-300
            "
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
            placeholder="you@example.com"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              outline-none
              placeholder:text-slate-600
              transition
              focus:border-cyan-400/50
              focus:bg-white/[0.07]
              focus:ring-2
              focus:ring-cyan-400/10
            "
          />

        </div>



        {/* Password */}

        <div>

          <label
            htmlFor="password"
            className="
              text-sm
              font-medium
              text-slate-300
            "
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
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              outline-none
              placeholder:text-slate-600
              transition
              focus:border-cyan-400/50
              focus:bg-white/[0.07]
              focus:ring-2
              focus:ring-cyan-400/10
            "
          />

        </div>



        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-white
            px-6
            py-3.5
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          {loading
            ? "Signing in..."
            : "Sign In"}

        </button>


      </form>

    </div>

  )

}


export default AdminLogin

