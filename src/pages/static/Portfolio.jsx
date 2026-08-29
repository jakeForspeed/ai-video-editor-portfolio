import { useMemo, useState } from "react"
import VideoCard from "../components/VideoCard"
import videos from "../data/videos"

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = [
    "All",
    ...new Set(videos.map((video) => video.category)),
  ]

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return videos
    }

    return videos.filter(
      (video) => video.category === activeCategory
    )
  }, [activeCategory])

  return (
    <div className="min-h-screen pt-20">

      {/* HEADER */}
      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Portfolio
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Selected
            <span className="text-slate-500"> Work.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            A collection of AI-generated videos, advertisements,
            social media content, and creative experiments.
          </p>

        </div>

      </section>


      {/* PORTFOLIO */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* FILTERS */}
          <div className="mb-12 flex flex-wrap gap-3">

            {categories.map((category) => {

              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    rounded-full px-5 py-2.5 text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "bg-white text-slate-950"
                        : "border border-white/10 text-slate-400 hover:border-cyan-400/40 hover:text-white"
                    }
                  `}
                >
                  {category}
                </button>
              )
            })}

          </div>


          {/* VIDEO GRID */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
              />
            ))}

          </div>


          {/* EMPTY STATE */}
          {filteredVideos.length === 0 && (
            <div className="py-24 text-center">

              <p className="text-slate-400">
                No videos found in this category.
              </p>

            </div>
          )}

        </div>

      </section>

    </div>
  )
}

export default Portfolio