import { Link } from "react-router-dom"
import { motion } from "motion/react"

import ScrollReveal from "../components/ScrollReveal"


const services = [
  {
    number: "01",
    title: "AI Video Advertisements",
    description:
      "Short-form product and brand advertisements using AI-generated visuals, creative direction, editing, and motion.",
    deliverables: [
      "Product advertisements",
      "Social media ads",
      "Brand promotional videos",
      "Vertical advertisements",
    ],
  },
  {
    number: "02",
    title: "Short-Form Content",
    description:
      "Engaging vertical videos designed for TikTok, Instagram Reels, and YouTube Shorts.",
    deliverables: [
      "TikTok videos",
      "Instagram Reels",
      "YouTube Shorts",
      "Social media content",
    ],
  },
  {
    number: "03",
    title: "AI Cinematic Videos",
    description:
      "Creative cinematic videos combining AI-generated imagery, storytelling, editing, and visual atmosphere.",
    deliverables: [
      "Cinematic scenes",
      "AI storytelling",
      "Creative concepts",
      "Visual experiments",
    ],
  },
  {
    number: "04",
    title: "Video Editing",
    description:
      "Professional editing focused on pacing, transitions, captions, sound design, and visual consistency.",
    deliverables: [
      "Cuts and pacing",
      "Captions",
      "Sound design",
      "Color enhancement",
    ],
  },
]


function Services() {

  return (

    <div className="min-h-screen pt-20">


      {/* ========================================
          HEADER
      ======================================== */}

      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <ScrollReveal direction="up">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Services
            </p>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.1}
          >

            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">

              Creative video

              <span className="text-slate-500">
                {" "}solutions.
              </span>

            </h1>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.2}
          >

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

              I combine AI-generated visuals with creative
              editing to produce engaging content for
              brands, products, and social media.

            </p>

          </ScrollReveal>

        </div>

      </section>



      {/* ========================================
          SERVICES
      ======================================== */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="divide-y divide-white/10">

            {services.map(
              (service, index) => (

                <ScrollReveal
                  key={service.number}
                  direction="up"
                  delay={index * 0.08}
                >

                  <motion.div

                    whileHover={{
                      x: 6,
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
                      grid
                      gap-8
                      py-12
                      md:grid-cols-[120px_1fr_1fr]
                      md:items-start
                    "
                  >


                    {/* ==================================
                        NUMBER
                    ================================== */}

                    <div>

                      <span
                        className="
                          text-sm
                          font-medium
                          text-slate-600
                          transition-colors
                          duration-300
                          group-hover:text-cyan-400
                        "
                      >
                        {service.number}
                      </span>

                    </div>



                    {/* ==================================
                        TITLE
                    ================================== */}

                    <div>

                      <h2
                        className="
                          text-3xl
                          font-semibold
                          text-white
                          transition-colors
                          duration-300
                          group-hover:text-cyan-400
                        "
                      >
                        {service.title}
                      </h2>

                    </div>



                    {/* ==================================
                        DETAILS
                    ================================== */}

                    <div>

                      <p className="leading-7 text-slate-400">
                        {service.description}
                      </p>


                      <ul className="mt-6 space-y-2">

                        {service.deliverables.map(
                          (item, itemIndex) => (

                            <motion.li
                              key={item}

                              initial={{
                                opacity: 0,
                                x: 10,
                              }}

                              whileInView={{
                                opacity: 1,
                                x: 0,
                              }}

                              viewport={{
                                once: true,
                                amount: 0.2,
                              }}

                              transition={{
                                duration: 0.4,
                                delay:
                                  index * 0.08 +
                                  itemIndex * 0.05,
                              }}

                              className="
                                flex
                                items-center
                                gap-3
                                text-sm
                                text-slate-300
                              "
                            >

                              <span
                                className="
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-cyan-400
                                  transition-transform
                                  duration-300
                                  group-hover:scale-125
                                "
                              />

                              {item}

                            </motion.li>

                          )
                        )}

                      </ul>

                    </div>

                  </motion.div>

                </ScrollReveal>

              )
            )}

          </div>

        </div>

      </section>



      {/* ========================================
          CTA
      ======================================== */}

      <section className="border-t border-white/10 py-28">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <ScrollReveal direction="up">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Start a project
            </p>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.1}
          >

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">

              Have an idea for a video?

            </h2>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.2}
          >

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-400">

              Tell me what you're trying to create and
              let's turn the idea into something visual.

            </p>

          </ScrollReveal>


          <ScrollReveal
            direction="up"
            delay={0.3}
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
                Let's Talk
              </Link>

            </motion.div>

          </ScrollReveal>

        </div>

      </section>

    </div>
  )
}


export default Services