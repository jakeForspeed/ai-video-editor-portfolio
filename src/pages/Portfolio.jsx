import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"

import ScrollReveal from "../components/ScrollReveal"

import { getVideos } from "../services/videoService"


function Portfolio() {

  const [videos, setVideos] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [activeCategory, setActiveCategory] =
    useState("All")


  /*
   * Load videos
   */
  useEffect(() => {

    async function loadVideos() {

      try {

        const data =
          await getVideos()

        setVideos(data)

      } catch (error) {

        console.error(
          "Failed to load videos:",
          error
        )

      } finally {

        setLoading(false)

      }

    }


    loadVideos()

  }, [])


  /*
   * Build categories dynamically
   */
  const categories = useMemo(() => {

    const uniqueCategories = [
      ...new Set(
        videos
          .map(
            (video) =>
              video.category
          )
          .filter(Boolean)
      ),
    ]


    return [
      "All",
      ...uniqueCategories,
    ]

  }, [videos])


  /*
   * Filter videos
   */
  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter(
          (video) =>
            video.category ===
            activeCategory
        )


  return (

    <div className="pt-20">


      {/* ========================================
          HEADER
      ======================================== */}

      <section className="border-b border-white/10 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <ScrollReveal direction="up">

            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
              Portfolio
            </p>


            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
              Selected work.
            </h1>


            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              A collection of AI-generated videos,
              product advertisements, cinematic
              visuals and creative editing projects.
            </p>

          </ScrollReveal>

        </div>

      </section>



      {/* ========================================
          FILTERS
      ======================================== */}

      <section className="sticky top-20 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">

        <div className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-8">

          <div className="flex min-w-max gap-2 py-4">

            {categories.map(
              (category) => {

                const isActive =
                  activeCategory === category


                return (

                  <motion.button
                    key={category}

                    type="button"

                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }

                    whileHover={{
                      y: -2,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    transition={{
                      duration: 0.2,
                    }}

                    className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-slate-950"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >

                    {/* Animated active background */}

                    {isActive && (

                      <motion.span
                        layoutId="active-category"
                        className="absolute inset-0 -z-10 rounded-full bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />

                    )}


                    <span className="relative z-10">
                      {category}
                    </span>

                  </motion.button>

                )

              }
            )}

          </div>

        </div>

      </section>



      {/* ========================================
          VIDEOS
      ======================================== */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">


          {/* LOADING */}

          {loading ? (

            <div className="grid gap-8 md:grid-cols-2">

              {[1, 2, 3, 4].map(
                (item) => (

                  <div
                    key={item}
                    className="aspect-video animate-pulse rounded-3xl bg-white/5"
                  />

                )
              )}

            </div>

          ) : filteredVideos.length === 0 ? (

            /* EMPTY */

            <ScrollReveal direction="up">

              <div className="py-24 text-center">

                <p className="text-slate-500">
                  No projects found.
                </p>

              </div>

            </ScrollReveal>

          ) : (

            /* VIDEO GRID */

            <motion.div
              layout
              className="grid gap-x-8 gap-y-14 md:grid-cols-2"
            >

              <AnimatePresence mode="popLayout">

                {filteredVideos.map(
                  (video, index) => (

                    <motion.div
                      key={video.id}

                      layout

                      initial={{
                        opacity: 0,
                        y: 30,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: 20,
                        scale: 0.97,
                      }}

                      transition={{
                        duration: 0.45,
                        delay:
                          index * 0.05,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >

                      <PortfolioCard
                        video={video}
                      />

                    </motion.div>

                  )
                )}

              </AnimatePresence>

            </motion.div>

          )}

        </div>

      </section>

    </div>
  )
}



/* ============================================
   PORTFOLIO CARD
============================================ */

function PortfolioCard({
  video,
}) {

  return (

    <Link
      to={`/portfolio/${video.slug}`}
      className="group block"
    >

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
      >


        {/* ====================================
            THUMBNAIL
        ==================================== */}

        <div className="relative overflow-hidden rounded-3xl bg-white/5">


          {/* Image */}

          <motion.img
            src={video.thumbnail_url}
            alt={video.title}
            loading="lazy"
            decoding="async"

            className="aspect-video w-full object-cover"

            whileHover={{
              scale: 1.05,
            }}

            transition={{
              duration: 0.6,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />


          {/* =================================
              HOVER OVERLAY
          ================================= */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/0
              transition-all
              duration-500
              group-hover:bg-black/30
            "
          >


            {/* PLAY BUTTON */}

            <div
              className="
                flex
                h-16
                w-16
                scale-75
                items-center
                justify-center
                rounded-full
                bg-white
                text-slate-950
                opacity-0
                shadow-2xl
                transition-all
                duration-300
                group-hover:scale-100
                group-hover:opacity-100
              "
            >

              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-6 w-6 fill-current"
              >

                <path d="M8 5v14l11-7z" />

              </svg>

            </div>

          </div>



          {/* =================================
              FEATURED BADGE
          ================================= */}

          {video.featured && (

            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-950 backdrop-blur">

              Featured

            </div>

          )}

        </div>



        {/* ====================================
            VIDEO INFORMATION
        ==================================== */}

        <div className="mt-5">


          {/* Category + Duration */}

          <div className="flex items-center justify-between gap-4">

            <p className="text-sm text-cyan-400">

              {video.category}

            </p>


            {video.duration && (

              <p className="text-sm text-slate-500">

                {video.duration}

              </p>

            )}

          </div>



          {/* Title */}

          <h2
            className="
              mt-2
              text-2xl
              font-semibold
              text-white
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:text-cyan-400
            "
          >

            {video.title}

          </h2>



          {/* Description */}

          {video.description && (

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">

              {video.description}

            </p>

          )}



          {/* View Project */}

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
              text-sm
              text-slate-500
              transition-all
              duration-300
              group-hover:gap-3
              group-hover:text-white
            "
          >

            <span>
              View project
            </span>

            <span>
              →
            </span>

          </div>

        </div>

      </motion.div>

    </Link>

  )
}


export default Portfolio