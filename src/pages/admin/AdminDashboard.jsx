import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
  getCurrentAdmin,
} from "../../services/authService"

import {
  getAllVideos,
} from "../../services/videoService"


function AdminDashboard() {

  const [admin, setAdmin] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [videos, setVideos] =
    useState([])


  useEffect(() => {

    async function loadDashboard() {

      try {

        const user =
          await getCurrentAdmin()

        setAdmin(user)


        if (!user) {
          return
        }


        const data =
          await getAllVideos()

        setVideos(data)

      } catch (error) {

        console.error(
          "Failed to load dashboard:",
          error
        )

      } finally {

        setLoading(false)

      }

    }


    loadDashboard()

  }, [])


  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

          <p className="mt-5 text-sm text-slate-500">
            Loading dashboard...
          </p>

        </div>

      </div>

    )

  }


  const publishedVideos =
    videos.filter(
      (video) => video.published
    ).length


  const draftVideos =
    videos.filter(
      (video) => !video.published
    ).length


  const featuredVideos =
    videos.filter(
      (video) => video.featured
    ).length


  return (

    <div className="space-y-10">


      {/* Header */}

      <div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Admin
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back, Jake.
        </p>

      </div>



      {/* Admin Info */}

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

        <p className="text-xs uppercase tracking-wider text-slate-500">
          Signed in as
        </p>

        <p className="mt-2 text-sm font-medium text-white">
          {admin?.email}
        </p>

      </div>



      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


        {/* Total */}

        <StatCard
          label="Total Videos"
          value={videos.length}
        />


        {/* Published */}

        <StatCard
          label="Published"
          value={publishedVideos}
        />


        {/* Drafts */}

        <StatCard
          label="Drafts"
          value={draftVideos}
        />


        {/* Featured */}

        <StatCard
          label="Featured"
          value={featuredVideos}
        />

      </div>



      {/* Portfolio Overview */}

      <section>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Portfolio
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Recent Videos
            </h2>

          </div>


          <div className="flex gap-3">

            <Link
              to="/admin/portfolio"
              className="
                rounded-full
                border
                border-white/10
                px-5
                py-2.5
                text-sm
                font-medium
                text-slate-300
                transition
                hover:border-cyan-400/40
                hover:text-white
              "
            >
              Manage Portfolio
            </Link>


            <Link
              to="/admin/portfolio/new"
              className="
                rounded-full
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-950
                transition
                hover:bg-cyan-400
              "
            >
              + Add Video
            </Link>

          </div>

        </div>



        {/* Videos */}

        <div className="mt-6">

          {videos.length === 0 ? (

            <div className="
              rounded-2xl
              border
              border-dashed
              border-white/10
              p-12
              text-center
            ">

              <h3 className="text-lg font-semibold text-white">
                No videos yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add your first AI video to your portfolio.
              </p>


              <Link
                to="/admin/portfolio/new"
                className="
                  mt-6
                  inline-block
                  rounded-full
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-950
                  transition
                  hover:bg-cyan-400
                "
              >
                Add Your First Video
              </Link>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2">

              {videos
                .slice(0, 4)
                .map((video) => (

                  <div
                    key={video.id}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.02]
                    "
                  >

                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="
                        aspect-video
                        w-full
                        object-cover
                      "
                    />


                    <div className="p-5">

                      <div className="flex flex-wrap gap-2">

                        <span className="
                          rounded-full
                          bg-white/5
                          px-3
                          py-1
                          text-xs
                          text-slate-400
                        ">
                          {video.category}
                        </span>


                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            ${
                              video.published
                                ? "bg-emerald-400/10 text-emerald-400"
                                : "bg-yellow-400/10 text-yellow-400"
                            }
                          `}
                        >
                          {video.published
                            ? "Published"
                            : "Draft"}
                        </span>

                      </div>


                      <h3 className="mt-4 truncate text-lg font-semibold text-white">
                        {video.title}
                      </h3>


                      <div className="mt-4 flex gap-3">

                        <Link
                          to={`/portfolio/${video.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            rounded-full
                            border
                            border-white/10
                            px-4
                            py-2
                            text-sm
                            text-slate-300
                            transition
                            hover:border-cyan-400/40
                            hover:text-white
                          "
                        >
                          View
                        </Link>


                        <Link
                          to={`/admin/portfolio/${video.id}/edit`}
                          className="
                            rounded-full
                            bg-white/10
                            px-4
                            py-2
                            text-sm
                            text-white
                            transition
                            hover:bg-white/20
                          "
                        >
                          Edit
                        </Link>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </section>



      {/* Messages */}

      <section>

        <div className="
          flex
          flex-col
          gap-5
          rounded-2xl
          border
          border-white/10
          bg-white/[0.02]
          p-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <div>

            <p className="text-sm text-slate-500">
              Client Communication
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Contact Messages
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              View inquiries submitted through your portfolio.
            </p>

          </div>


          <Link
            to="/admin/messages"
            className="
              shrink-0
              rounded-full
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-950
              transition
              hover:bg-cyan-400
            "
          >
            View Messages
          </Link>

        </div>

      </section>

    </div>

  )
}



function StatCard({
  label,
  value,
}) {

  return (

    <div className="
      rounded-2xl
      border
      border-white/10
      bg-white/[0.02]
      p-6
    ">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>

    </div>

  )

}


export default AdminDashboard