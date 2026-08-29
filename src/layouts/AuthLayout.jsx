
import { Link, Outlet } from "react-router-dom"
import { motion } from "motion/react"


function AuthLayout() {

  return (

    <div className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-slate-950
      px-6
      py-12
    ">


      {/* Background glow */}

      <div className="
        pointer-events-none
        absolute
        -left-40
        -top-40
        h-96
        w-96
        rounded-full
        bg-cyan-400/10
        blur-3xl
      " />

      <div className="
        pointer-events-none
        absolute
        -bottom-40
        -right-40
        h-96
        w-96
        rounded-full
        bg-blue-500/10
        blur-3xl
      " />


      {/* Subtle grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />


      {/* Content */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
        "
      >


        {/* Logo */}

        <div className="mb-8 text-center">

          <Link
            to="/"
            className="inline-block"
          >

            <div className="
              text-2xl
              font-bold
              tracking-tight
              text-white
            ">
              JAKE<span className="text-cyan-400">.</span>
            </div>

          </Link>


          <p className="
            mt-2
            text-sm
            text-slate-500
          ">
            Admin Portal
          </p>

        </div>


        {/* Page content */}

        <Outlet />


        {/* Back to website */}

        <div className="
          mt-6
          text-center
        ">

          <Link
            to="/"
            className="
              text-sm
              text-slate-500
              transition
              hover:text-cyan-400
            "
          >
            ← Back to website
          </Link>

        </div>


        {/* Footer */}

        <p className="
          mt-6
          text-center
          text-xs
          text-slate-600
        ">
          Private administration area
        </p>

      </motion.div>

    </div>

  )

}


export default AuthLayout

