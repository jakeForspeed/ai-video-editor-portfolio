import { useEffect, useState } from "react"
import {
  Link,
  useNavigate,
} from "react-router-dom"
import {
  getCurrentAdmin,
  logoutAdmin,
} from "../../services/authService"
import {
  deleteFile,
  deleteVideo,
  getAllVideos,
} from "../../services/videoService"
import DeleteVideoModal from "../../components/admin/DeleteVideoModal"

function AdminDashboard() {

  const navigate = useNavigate()

const [admin, setAdmin] = useState(null)

const [loading, setLoading] = useState(true)

const [videos, setVideos] = useState([])

const [videosLoading, setVideosLoading] = useState(true)

const [deletingVideo, setDeletingVideo] =
  useState(null)

const [deleting, setDeleting] =
  useState(false)


  async function handleDeleteVideo() {

  if (!deletingVideo) {
    return
  }


  setDeleting(true)


  try {

    /*
     * Delete video file
     */
    if (deletingVideo.video_path) {

      await deleteFile(
        "videos",
        deletingVideo.video_path
      )

    }


    /*
     * Delete thumbnail
     */
    if (deletingVideo.thumbnail_path) {

      await deleteFile(
        "thumbnails",
        deletingVideo.thumbnail_path
      )

    }


    /*
     * Delete database record
     */
    await deleteVideo(
      deletingVideo.id
    )


    /*
     * Remove from current UI
     */
    setVideos((currentVideos) =>
      currentVideos.filter(
        (video) =>
          video.id !== deletingVideo.id
      )
    )


    setDeletingVideo(null)

  } catch (error) {

    console.error(
      "Failed to delete video:",
      error
    )


    alert(
      error.message ||
      "Failed to delete video."
    )

  } finally {

    setDeleting(false)

  }
}


  useEffect(() => {

  async function loadDashboard() {

    try {

      const user =
        await getCurrentAdmin()

      if (!user) {

        navigate(
          "/admin/login",
          {
            replace: true,
          }
        )

        return
      }


      setAdmin(user)


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
      setVideosLoading(false)

    }

  }

  loadDashboard()

}, [navigate])


  async function handleLogout() {

    try {

      await logoutAdmin()

      navigate("/admin/login", {
        replace: true,
      })

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      )

    }
  }


  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center pt-20">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

          <p className="mt-5 text-sm text-slate-500">
            Loading dashboard...
          </p>

        </div>

      </div>
    )
  }


  return (
    <div className="min-h-screen pt-20">

      {/* Header */}
      <header className="border-b border-white/10">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-8">

          <div className="flex items-center justify-between gap-6">

            <div>

                <p className="text-sm text-cyan-400">
                Admin
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                Dashboard
                </h1>

            </div>


            <Link
                to="/admin/videos/new"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
                + Add Video
            </Link>

            </div>


          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:border-red-400/30 hover:text-red-300"
          >
            Sign Out
          </button>

        </div>

      </header>


      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">

          <p className="text-sm text-slate-500">
            Signed in as
          </p>

          <p className="mt-2 text-lg font-medium">
            {admin?.email}
          </p>

        </div>


        {/* Video Management */}
        <div className="mt-8">

            <div className="flex items-center justify-between">

                <div>

                <p className="text-sm text-slate-500">
                    Portfolio
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                    Your Videos
                </h2>

                </div>


                <Link
                to="/admin/videos/new"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                + Add Video
                </Link>

            </div>


            <div className="mt-6">

                {videosLoading ? (

                <div className="rounded-2xl border border-white/10 p-10 text-center">

                    <p className="text-sm text-slate-500">
                    Loading videos...
                    </p>

                </div>

                ) : videos.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

                    <h3 className="text-lg font-semibold">
                    No videos yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                    Add your first AI video to your portfolio.
                    </p>

                    <Link
                    to="/admin/videos/new"
                    className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                    Add Your First Video
                    </Link>

                </div>

                ) : (

                <div className="space-y-4">

                    {videos.map((video) => (

                    <div
                        key={video.id}
                        className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center"
                    >

                        {/* Thumbnail */}
                        <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="aspect-video w-full rounded-xl object-cover sm:h-28 sm:w-48"
                        />


                        {/* Information */}
                        <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                            {video.category}
                            </span>

                            {video.featured && (
                            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
                                Featured
                            </span>
                            )}

                            <span
                            className={`rounded-full px-3 py-1 text-xs ${
                                video.published
                                ? "bg-emerald-400/10 text-emerald-400"
                                : "bg-yellow-400/10 text-yellow-400"
                            }`}
                            >
                            {video.published
                                ? "Published"
                                : "Draft"}
                            </span>

                        </div>


                        <h3 className="mt-3 truncate text-lg font-semibold">
                            {video.title}
                        </h3>


                        <p className="mt-1 text-sm text-slate-500">
                            {video.duration || "No duration"}
                        </p>

                        </div>


                        {/* Action */}
                        <div className="flex flex-wrap gap-2">

                            <Link
                                to={`/portfolio/${video.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                            >
                                View
                            </Link>


                            <Link
                                to={`/admin/videos/${video.id}/edit`}
                                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
                            >
                                Edit
                            </Link>


                            <button
                                type="button"
                                onClick={() =>
                                setDeletingVideo(video)
                                }
                                className="rounded-full bg-red-400/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-400/20"
                            >
                                Delete
                            </button>

                            </div>

                    </div>

                    ))}

                </div>

                )}

            </div>

            </div>

      </main>



      <DeleteVideoModal
        video={deletingVideo}
        deleting={deleting}
        onCancel={() =>
            setDeletingVideo(null)
        }
        onConfirm={
            handleDeleteVideo
        }
    />

    </div>
  )
}

export default AdminDashboard