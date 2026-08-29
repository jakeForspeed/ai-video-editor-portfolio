import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import ScrollReveal from "../components/ScrollReveal"


function Contact() {

  const [submitted, setSubmitted] =
    useState(false)


  function handleSubmit(event) {

    event.preventDefault()

    setSubmitted(true)

  }


  return (

    <div className="min-h-screen pt-20">


      {/* ========================================
          HEADER
      ======================================== */}

      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <ScrollReveal direction="up">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Contact
            </p>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.1}
          >

            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">

              Let's create

              <span className="text-slate-500">
                {" "}something.
              </span>

            </h1>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.2}
          >

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

              Have a video project in mind?
              Send me a message and tell me
              what you're looking to create.

            </p>

          </ScrollReveal>

        </div>

      </section>



      {/* ========================================
          CONTACT
      ======================================== */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1fr]">


            {/* ==================================
                CONTACT INFO
            ================================== */}

            <ScrollReveal direction="left">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  Get in touch
                </p>


                <h2 className="mt-5 text-3xl font-bold">

                  Have a project?

                </h2>


                <p className="mt-5 leading-7 text-slate-400">

                  Whether you need an AI product
                  advertisement, social media video,
                  or creative concept, I'd love to
                  hear about it.

                </p>


                <div className="mt-10 space-y-6">


                  {/* Email */}

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}

                    transition={{
                      duration: 0.2,
                    }}
                  >

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </p>

                    <p className="mt-2 text-white">
                      your.email@example.com
                    </p>

                  </motion.div>



                  {/* Availability */}

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}

                    transition={{
                      duration: 0.2,
                    }}
                  >

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Availability
                    </p>

                    <p className="mt-2 text-white">
                      Available for freelance projects
                    </p>

                  </motion.div>

                </div>

              </div>

            </ScrollReveal>



            {/* ==================================
                FORM CARD
            ================================== */}

            <ScrollReveal
              direction="right"
              delay={0.1}
            >

              <motion.div

                whileHover={{
                  borderColor:
                    "rgba(255,255,255,0.16)",
                }}

                transition={{
                  duration: 0.3,
                }}

                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  p-6
                  sm:p-8
                "
              >

                <AnimatePresence mode="wait">

                  {submitted ? (

                    /* =================================
                       SUCCESS STATE
                    ================================= */

                    <motion.div

                      key="success"

                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}

                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}

                      transition={{
                        duration: 0.35,
                      }}

                      className="
                        flex
                        min-h-[400px]
                        flex-col
                        items-center
                        justify-center
                        text-center
                      "
                    >


                      {/* Success icon */}

                      <motion.div

                        initial={{
                          scale: 0,
                          rotate: -20,
                        }}

                        animate={{
                          scale: 1,
                          rotate: 0,
                        }}

                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                          delay: 0.1,
                        }}

                        className="
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-full
                          bg-cyan-400/10
                          text-cyan-400
                        "
                      >

                        <svg
                          className="h-8 w-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />

                        </svg>

                      </motion.div>



                      {/* Success title */}

                      <motion.h3

                        initial={{
                          opacity: 0,
                          y: 10,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        transition={{
                          delay: 0.2,
                        }}

                        className="mt-6 text-2xl font-semibold"
                      >

                        Message received!

                      </motion.h3>



                      {/* Success description */}

                      <motion.p

                        initial={{
                          opacity: 0,
                          y: 10,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        transition={{
                          delay: 0.3,
                        }}

                        className="mt-3 max-w-md text-slate-400"
                      >

                        Thanks for reaching out.
                        This form will be connected
                        to a real contact system later.

                      </motion.p>



                      {/* Send another */}

                      <motion.button

                        initial={{
                          opacity: 0,
                        }}

                        animate={{
                          opacity: 1,
                        }}

                        transition={{
                          delay: 0.4,
                        }}

                        whileHover={{
                          x: 3,
                        }}

                        whileTap={{
                          scale: 0.97,
                        }}

                        onClick={() =>
                          setSubmitted(false)
                        }

                        className="
                          mt-6
                          text-sm
                          font-medium
                          text-cyan-400
                          transition-colors
                          hover:text-cyan-300
                        "
                      >

                        Send another message →

                      </motion.button>

                    </motion.div>

                  ) : (

                    /* =================================
                       FORM
                    ================================= */

                    <motion.form

                      key="form"

                      initial={{
                        opacity: 0,
                      }}

                      animate={{
                        opacity: 1,
                      }}

                      exit={{
                        opacity: 0,
                      }}

                      transition={{
                        duration: 0.3,
                      }}

                      onSubmit={handleSubmit}

                      className="space-y-6"
                    >


                      {/* =================================
                          NAME
                      ================================= */}

                      <FormField
                        label="Name"
                        htmlFor="name"
                      >

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
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
                            transition-all
                            duration-300
                            focus:border-cyan-400/50
                            focus:bg-white/[0.07]
                            focus:ring-2
                            focus:ring-cyan-400/10
                          "
                        />

                      </FormField>



                      {/* =================================
                          EMAIL
                      ================================= */}

                      <FormField
                        label="Email"
                        htmlFor="email"
                      >

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
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
                            transition-all
                            duration-300
                            focus:border-cyan-400/50
                            focus:bg-white/[0.07]
                            focus:ring-2
                            focus:ring-cyan-400/10
                          "
                        />

                      </FormField>



                      {/* =================================
                          PROJECT TYPE
                      ================================= */}

                      <FormField
                        label="Project Type"
                        htmlFor="project"
                      >

                        <select
                          id="project"
                          name="project"
                          className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-slate-900
                            px-4
                            py-3
                            text-white
                            outline-none
                            transition-all
                            duration-300
                            focus:border-cyan-400/50
                            focus:ring-2
                            focus:ring-cyan-400/10
                          "
                        >

                          <option>
                            AI Video Advertisement
                          </option>

                          <option>
                            Social Media Video
                          </option>

                          <option>
                            AI Cinematic Video
                          </option>

                          <option>
                            Video Editing
                          </option>

                          <option>
                            Other
                          </option>

                        </select>

                      </FormField>



                      {/* =================================
                          MESSAGE
                      ================================= */}

                      <FormField
                        label="Project Details"
                        htmlFor="message"
                      >

                        <textarea
                          id="message"
                          name="message"
                          required
                          rows="6"
                          placeholder="Tell me about your project..."
                          className="
                            mt-2
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            py-3
                            text-white
                            outline-none
                            placeholder:text-slate-600
                            transition-all
                            duration-300
                            focus:border-cyan-400/50
                            focus:bg-white/[0.07]
                            focus:ring-2
                            focus:ring-cyan-400/10
                          "
                        />

                      </FormField>



                      {/* =================================
                          SUBMIT
                      ================================= */}

                      <motion.button

                        type="submit"

                        whileHover={{
                          y: -2,
                        }}

                        whileTap={{
                          scale: 0.98,
                        }}

                        transition={{
                          duration: 0.2,
                        }}

                        className="
                          w-full
                          rounded-xl
                          bg-white
                          px-6
                          py-3.5
                          font-semibold
                          text-slate-950
                          transition-colors
                          duration-300
                          hover:bg-cyan-400
                        "
                      >

                        Send Message

                      </motion.button>

                    </motion.form>

                  )}

                </AnimatePresence>

              </motion.div>

            </ScrollReveal>

          </div>

        </div>

      </section>

    </div>
  )
}



/* ============================================
   FORM FIELD
============================================ */

function FormField({
  label,
  htmlFor,
  children,
}) {

  return (

    <div>

      <label
        htmlFor={htmlFor}
        className="
          text-sm
          font-medium
          text-slate-300
        "
      >

        {label}

      </label>

      {children}

    </div>

  )
}


export default Contact