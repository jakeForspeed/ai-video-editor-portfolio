import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getVideoBySlug } from "../services/videoService"

function VideoDetails() {
  const { slug } = useParams()

  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadVideo() {
      try {
        setLoading(true)
        setError(null)

        const data = await getVideoBySlug(slug)

        setVideo(data)
      } catch (error) {
        console.error("Failed to load video:", error)

        setError("Video not found.")
      } finally {
        setLoading(false)
      }
    }

    loadVideo()
  }, [slug])

  // Video not found
  if (!video) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 pt-20">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            404
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Video Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            The video you're looking for doesn't exist.
          </p>

          <Link
            to="/portfolio"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Back to Portfolio
          </Link>

        </div>

      </section>
    )
  }

  return (
    <div className="min-h-screen pt-20">

      {/* VIDEO HERO */}
      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">

          {/* Back button */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <span>←</span>
            Back to Portfolio
          </Link>


          {/* Video */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">

            {video.videoUrl ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.thumbnail_url}
                aria-label={video.title}
                className="aspect-video w-full rounded-3xl bg-black object-contain"
                >
                <source
                  src={video.video_url}
                  type="video/mp4"
                />

                Your browser does not support video playback.
              </video>
            ) : (
              <div
                className="relative aspect-video w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${video.thumbnail_url})`,
                }}
              >

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-950">

                    <svg
                      className="ml-1 h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>

                  </div>

                </div>

                <div className="absolute bottom-6 left-6">

                  <p className="text-sm text-white/70">
                    Video preview
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Actual video will be connected later
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </section>


      {/* PROJECT INFORMATION */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-[1fr_320px]">

            {/* Main content */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                {video.category}
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {video.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
                {video.description}
              </p>


              {/* Project description */}
              <div className="mt-12 border-t border-white/10 pt-10">

                <h2 className="text-2xl font-semibold">
                  Project Overview
                </h2>

                <p className="mt-5 max-w-3xl leading-8 text-slate-400">
                  This project was created as a creative demonstration
                  of AI-assisted video production. The goal was to
                  combine AI-generated visuals with creative editing,
                  pacing, sound design, and visual storytelling.
                </p>

              </div>

            </div>


            {/* Sidebar */}
            <aside>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Project Details
                </h2>


                {/* Category */}
                <div className="mt-8 border-b border-white/10 pb-5">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Category
                  </p>

                  <p className="mt-2 text-white">
                    {video.category}
                  </p>

                </div>


                {/* Duration */}
                <div className="border-b border-white/10 py-5">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Duration
                  </p>

                  <p className="mt-2 text-white">
                    {video.duration}
                  </p>

                </div>


                {/* Tools */}
                <div className="pt-5">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Tools
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {video.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}

                  </div>

                </div>

              </div>


              {/* CTA */}
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">

                <h3 className="text-lg font-semibold">
                  Like this project?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Let's create something similar for your brand.
                </p>

                <Link
                  to="/contact"
                  className="mt-5 block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Let's Work Together
                </Link>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* NEXT PROJECT */}
      <section className="border-t border-white/10 py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm uppercase tracking-wider text-slate-500">
                Explore More
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                More Projects
              </h2>

            </div>

            <Link
              to="/portfolio"
              className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View All →
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}

export default VideoDetails