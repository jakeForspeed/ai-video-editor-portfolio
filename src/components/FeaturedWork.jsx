import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ScrollReveal from "./ScrollReveal"

import { getVideos } from "../services/videoService"


function FeaturedWork() {

  const [videos, setVideos] =
    useState([])


  useEffect(() => {

    async function loadFeatured() {

      try {

        const data =
          await getVideos()


        const featured =
          data
            .filter(
              (video) =>
                video.featured
            )
            .slice(0, 3)


        setVideos(featured)

      } catch (error) {

        console.error(
          "Failed to load featured videos:",
          error
        )

      }

    }


    loadFeatured()

  }, [])


  if (!videos.length) {
    return null
  }


  return (
    <section className="border-t border-white/10 py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

<ScrollReveal>

          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
              Selected Work
            </p>


            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              A few things I've made.
            </h2>

          </div>
</ScrollReveal>


          <Link
            to="/portfolio"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            View all work →
          </Link>

        </div>


        <div className="mt-14 grid gap-8 md:grid-cols-2">

          {videos.slice(0, 2).map(
            (video, index) => (

                <ScrollReveal
      key={video.id}
      delay={index * 0.15}
      direction="up"
    >


              <FeaturedCard
                key={video.id}
                video={video}
                />

                </ScrollReveal>
            )
          )}

        </div>


        {videos[2] && (

<ScrollReveal
    direction="up"
    delay={0.3}
  >
          <div className="mt-8">


            <FeaturedCard
              video={videos[2]}
              large
              />

          </div>
              </ScrollReveal>

        )}

      </div>

    </section>
  )
}


function FeaturedCard({
  video,
  large = false,
}) {

  return (
    <Link
      to={`/portfolio/${video.slug}`}
      className="group block"
    >

      <div className="overflow-hidden rounded-3xl bg-white/5">

        <img
          src={video.thumbnail_url}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
            large
              ? "aspect-[21/9]"
              : "aspect-video"
          }`}
        />

      </div>


      <div className="mt-5">

        <p className="text-sm text-cyan-400">
          {video.category}
        </p>


        <h3 className="mt-2 text-xl font-semibold transition group-hover:text-cyan-400">
          {video.title}
        </h3>

      </div>

    </Link>
  )
}


export default FeaturedWork