import { Link } from "react-router-dom"
import { motion } from "motion/react"

import ScrollReveal from "../components/ScrollReveal"


function About() {

  return (

    <div className="min-h-screen pt-20">


      {/* ========================================
          HEADER
      ======================================== */}

      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <ScrollReveal direction="up">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              About
            </p>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.1}
          >

            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">

              AI meets

              <span className="text-slate-500">
                {" "}creativity.
              </span>

            </h1>

          </ScrollReveal>

        </div>

      </section>



      {/* ========================================
          ABOUT CONTENT
      ======================================== */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2">


            {/* STORY */}

            <ScrollReveal direction="left">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  My Approach
                </p>

                <h2 className="mt-5 text-3xl font-bold sm:text-4xl">

                  Using AI as a creative tool,
                  not a replacement for creativity.

                </h2>

              </div>

            </ScrollReveal>



            {/* STORY DESCRIPTION */}

            <div className="space-y-6 text-lg leading-8 text-slate-400">

              <ScrollReveal
                direction="right"
                delay={0.1}
              >

                <p>

                  AI has changed the way videos can be
                  imagined and produced. My goal is to
                  combine these new tools with thoughtful
                  editing and storytelling.

                </p>

              </ScrollReveal>


              <ScrollReveal
                direction="right"
                delay={0.2}
              >

                <p>

                  I create AI-generated visuals, experiment
                  with different styles, and turn those
                  visuals into polished videos designed for
                  real-world use.

                </p>

              </ScrollReveal>


              <ScrollReveal
                direction="right"
                delay={0.3}
              >

                <p>

                  Whether it's a product advertisement,
                  social media video, or cinematic concept,
                  I focus on making every shot serve a purpose.

                </p>

              </ScrollReveal>

            </div>

          </div>

        </div>

      </section>



      {/* ========================================
          WORKFLOW
      ======================================== */}

      <section className="border-t border-white/10 py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">


          {/* Workflow heading */}

          <ScrollReveal direction="up">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Workflow
            </p>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.1}
          >

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">

              From idea to final video.

            </h2>

          </ScrollReveal>



          {/* Workflow cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <ScrollReveal
              direction="up"
              delay={0}
            >

              <Workflow
                number="01"
                title="Concept"
                description="Understand the goal, audience, and visual direction."
              />

            </ScrollReveal>


            <ScrollReveal
              direction="up"
              delay={0.1}
            >

              <Workflow
                number="02"
                title="Generate"
                description="Create AI visuals and develop the scenes."
              />

            </ScrollReveal>


            <ScrollReveal
              direction="up"
              delay={0.2}
            >

              <Workflow
                number="03"
                title="Edit"
                description="Combine shots, pacing, sound, captions, and effects."
              />

            </ScrollReveal>


            <ScrollReveal
              direction="up"
              delay={0.3}
            >

              <Workflow
                number="04"
                title="Deliver"
                description="Export the final video in the required format."
              />

            </ScrollReveal>

          </div>

        </div>

      </section>



      {/* ========================================
          CTA
      ======================================== */}

      <section className="border-t border-white/10 py-28">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <ScrollReveal direction="up">

            <h2 className="text-4xl font-bold sm:text-5xl">

              Let's build something

              <span className="text-slate-500">
                {" "}memorable.
              </span>

            </h2>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.2}
          >

            <motion.div
              whileHover={{
                y: -3,
              }}

              whileTap={{
                scale: 0.97,
              }}

              className="inline-block"
            >

              <Link
                to="/contact"
                className="
                  mt-8
                  inline-block
                  rounded-full
                  bg-white
                  px-7
                  py-3.5
                  font-semibold
                  text-slate-950
                  transition-colors
                  duration-300
                  hover:bg-cyan-400
                "
              >

                Contact Me

              </Link>

            </motion.div>

          </ScrollReveal>

        </div>

      </section>

    </div>
  )
}



/* ============================================
   WORKFLOW CARD
============================================ */

function Workflow({
  number,
  title,
  description,
}) {

  return (

    <motion.div

      whileHover={{
        y: -6,
      }}

      transition={{
        duration: 0.25,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}

      className="
        group
        h-full
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        p-6
        transition-colors
        duration-300
        hover:border-white/20
        hover:bg-white/[0.04]
      "
    >


      {/* Number */}

      <span
        className="
          text-sm
          text-slate-600
          transition-colors
          duration-300
          group-hover:text-cyan-400
        "
      >

        {number}

      </span>



      {/* Title */}

      <h3
        className="
          mt-10
          text-xl
          font-semibold
          text-white
          transition-colors
          duration-300
          group-hover:text-cyan-400
        "
      >

        {title}

      </h3>



      {/* Description */}

      <p className="mt-3 text-sm leading-6 text-slate-400">

        {description}

      </p>



      {/* Bottom indicator */}

      <div
        className="
          mt-8
          h-px
          w-0
          bg-cyan-400
          transition-all
          duration-500
          group-hover:w-10
        "
      />

    </motion.div>

  )
}


export default About