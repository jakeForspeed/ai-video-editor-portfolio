import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
  deleteFile,
  deleteVideo,
  getAllVideos,
} from "../../services/videoService"

import DeleteVideoModal from "../../components/admin/DeleteVideoModal"


function AdminPortfolio() {

  const [videos, setVideos] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [deletingVideo, setDeletingVideo] =
    useState(null)

  const [deleting, setDeleting] =
    useState(false)


  async function loadVideos() {

    try {

      setLoading(true)

      const data =
        await getAllVideos()

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


  useEffect(() => {

    loadVideos()

  }, [])



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
       * Update UI
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



  return (

    <div className="space-y-8">


      {/* Header */}

      <div className="
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-end
        sm:justify-between
      ">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Portfolio
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Portfolio Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage the videos displayed on your public portfolio.
          </p>

        </div>


        <Link
          to="/admin/portfolio/new"
          className="
            w-fit
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



      {/* Loading */}

      {loading ? (

        <div className="space-y-4">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="
                h-36
                animate-pulse
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
              "
            />

          ))}

        </div>

      ) : videos.length === 0 ? (

        /* Empty */

        <div className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          p-14
          text-center
        ">

          <h2 className="text-xl font-semibold text-white">
            No portfolio videos
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Upload your first AI video to your portfolio.
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
            Add Video
          </Link>

        </div>

      ) : (

        /* Videos */

        <div className="space-y-4">

          {videos.map((video) => (

            <article
              key={video.id}
              className="
                flex
                flex-col
                gap-5
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
                p-4
                sm:flex-row
                sm:items-center
              "
            >

              {/* Thumbnail */}

              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="
                  aspect-video
                  w-full
                  rounded-xl
                  object-cover
                  sm:h-28
                  sm:w-48
                "
              />


              {/* Information */}

              <div className="min-w-0 flex-1">

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


                  {video.featured && (

                    <span className="
                      rounded-full
                      bg-cyan-400/10
                      px-3
                      py-1
                      text-xs
                      text-cyan-400
                    ">
                      Featured
                    </span>

                  )}


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


                <h2 className="
                  mt-3
                  truncate
                  text-lg
                  font-semibold
                  text-white
                ">
                  {video.title}
                </h2>


                <p className="mt-1 text-sm text-slate-500">
                  {video.duration || "No duration"}
                </p>

              </div>



              {/* Actions */}

              <div className="flex flex-wrap gap-2">

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


                <button
                  type="button"
                  onClick={() =>
                    setDeletingVideo(video)
                  }
                  className="
                    rounded-full
                    bg-red-400/10
                    px-4
                    py-2
                    text-sm
                    text-red-400
                    transition
                    hover:bg-red-400/20
                  "
                >
                  Delete
                </button>

              </div>

            </article>

          ))}

        </div>

      )}



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


export default AdminPortfolio