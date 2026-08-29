import { Link } from "react-router-dom"

function VideoCard({ video }) {
  return (
    <Link
      to={`/portfolio/${video.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">

        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/50" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 shadow-xl">
            <svg
              className="ml-1 h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

        </div>

        {/* Duration */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur">
          {video.duration}
        </span>

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {video.category}
        </span>

      </div>

      {/* Content */}
      <div className="p-6">

        <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-400">
          {video.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          {video.description}
        </p>

        {/* Tools */}
        <div className="mt-5 flex flex-wrap gap-2">

          {video.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400"
            >
              {tool}
            </span>
          ))}

        </div>

      </div>
    </Link>
  )
}

export default VideoCard