import { useEffect, useState } from "react"
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom"

import {
  createSlug,
  deleteFile,
  getAllVideos,
  updateVideo,
  uploadFile,
} from "../../services/videoService"


const categories = [
  "Product Ads",
  "Social Media",
  "Cinematic",
  "Automotive",
  "Fashion",
  "Food",
  "Technology",
  "Other",
]


function EditVideo() {

  const { id } = useParams()

  const navigate = useNavigate()


  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState("")


  const [title, setTitle] =
    useState("")

  const [category, setCategory] =
    useState("Product Ads")

  const [description, setDescription] =
    useState("")

  const [duration, setDuration] =
    useState("")

  const [tools, setTools] =
    useState("")

  const [featured, setFeatured] =
    useState(false)

  const [published, setPublished] =
    useState(true)


  const [existingVideo, setExistingVideo] =
    useState(null)

  const [existingThumbnail, setExistingThumbnail] =
    useState(null)


  const [newVideo, setNewVideo] =
    useState(null)

  const [newThumbnail, setNewThumbnail] =
    useState(null)


  const [thumbnailPreview, setThumbnailPreview] =
    useState("")


  useEffect(() => {

    async function loadVideo() {

      try {

        const videos =
          await getAllVideos()

        const video =
          videos.find(
            (item) =>
              String(item.id) === String(id)
          )

        if (!video) {

          setError(
            "Video not found."
          )

          return
        }


        setExistingVideo(video)

        setExistingThumbnail(video)


        setTitle(video.title || "")

        setCategory(
          video.category ||
          "Product Ads"
        )

        setDescription(
          video.description || ""
        )

        setDuration(
          video.duration || ""
        )

        setTools(
          Array.isArray(video.tools)
            ? video.tools.join(", ")
            : ""
        )

        setFeatured(
          Boolean(video.featured)
        )

        setPublished(
          Boolean(video.published)
        )

        setThumbnailPreview(
          video.thumbnail_url || ""
        )

      } catch (error) {

        console.error(error)

        setError(
          error.message ||
          "Failed to load video."
        )

      } finally {

        setLoading(false)

      }

    }

    loadVideo()

  }, [id])


  function handleThumbnailChange(event) {

    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }


    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a valid image."
      )

      return
    }


    setNewThumbnail(file)

    setThumbnailPreview(
      URL.createObjectURL(file)
    )

    setError("")
  }


  function handleVideoChange(event) {

    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }


    if (!file.type.startsWith("video/")) {

      setError(
        "Please select a valid video."
      )

      return
    }


    setNewVideo(file)

    setError("")
  }


  async function handleSubmit(event) {

    event.preventDefault()

    setError("")
    setSaving(true)


    let uploadedVideo = null
    let uploadedThumbnail = null


    try {

      const updates = {}


      /*
       * Title
       */
      const trimmedTitle =
        title.trim()

      if (!trimmedTitle) {

        throw new Error(
          "Title is required."
        )

      }


      updates.title =
        trimmedTitle


      /*
       * Update slug
       */
      updates.slug =
        createSlug(trimmedTitle)


      /*
       * Other fields
       */
      updates.category =
        category

      updates.description =
        description.trim()

      updates.duration =
        duration.trim()

      updates.tools =
        tools
          .split(",")
          .map(
            (tool) => tool.trim()
          )
          .filter(Boolean)

      updates.featured =
        featured

      updates.published =
        published


      /*
       * Replace video
       */
      if (newVideo) {

        uploadedVideo =
          await uploadFile(
            newVideo,
            "videos"
          )


        updates.video_url =
          uploadedVideo.url

        updates.video_path =
          uploadedVideo.path

      }


      /*
       * Replace thumbnail
       */
      if (newThumbnail) {

        uploadedThumbnail =
          await uploadFile(
            newThumbnail,
            "thumbnails"
          )


        updates.thumbnail_url =
          uploadedThumbnail.url

        updates.thumbnail_path =
          uploadedThumbnail.path

      }


      /*
       * Update database
       */
      const updatedVideo =
        await updateVideo(
          id,
          updates
        )


      /*
       * Delete old video
       * only after successful database update.
       */
      if (
        newVideo &&
        existingVideo?.video_path
      ) {

        try {

          await deleteFile(
            "videos",
            existingVideo.video_path
          )

        } catch (cleanupError) {

          console.error(
            "Failed to delete old video:",
            cleanupError
          )

        }

      }


      /*
       * Delete old thumbnail
       */
      if (
        newThumbnail &&
        existingVideo?.thumbnail_path
      ) {

        try {

          await deleteFile(
            "thumbnails",
            existingVideo.thumbnail_path
          )

        } catch (cleanupError) {

          console.error(
            "Failed to delete old thumbnail:",
            cleanupError
          )

        }

      }


      console.log(
        "Video updated:",
        updatedVideo
      )


      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      )

    } catch (error) {

      console.error(
        "Failed to update video:",
        error
      )


      /*
       * If new files were uploaded but
       * database update failed, clean them.
       */
      try {

        if (uploadedVideo?.path) {

          await deleteFile(
            "videos",
            uploadedVideo.path
          )

        }


        if (uploadedThumbnail?.path) {

          await deleteFile(
            "thumbnails",
            uploadedThumbnail.path
          )

        }

      } catch (cleanupError) {

        console.error(
          "Cleanup failed:",
          cleanupError
        )

      }


      setError(
        error.message ||
        "Failed to update video."
      )

    } finally {

      setSaving(false)

    }
  }


  if (loading) {

    return (
      <div className="min-h-screen px-6 py-20">

        <div className="mx-auto max-w-5xl">

          <p className="text-slate-500">
            Loading video...
          </p>

        </div>

      </div>
    )

  }


  if (error && !existingVideo) {

    return (
      <div className="min-h-screen px-6 py-20">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">

            <p className="text-red-300">
              {error}
            </p>

          </div>


          <Link
            to="/admin/dashboard"
            className="mt-6 inline-block text-sm text-cyan-400"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>
    )

  }


  return (
    <div className="min-h-screen pt-20">

      <header className="border-b border-white/10">

        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">

          <Link
            to="/admin/dashboard"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </Link>


          <h1 className="mt-5 text-3xl font-bold">
            Edit Video
          </h1>


          <p className="mt-2 text-slate-400">
            Update your portfolio project.
          </p>

        </div>

      </header>


      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}


          {/* Information */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Project Information
            </h2>


            <div className="mt-8 space-y-6">

              <div>

                <label className="text-sm font-medium text-slate-300">
                  Title
                </label>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                />

              </div>


              <div>

                <label className="text-sm font-medium text-slate-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
                >

                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div>

                <label className="text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  rows="5"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                />

              </div>


              <div className="grid gap-6 sm:grid-cols-2">

                <div>

                  <label className="text-sm font-medium text-slate-300">
                    Duration
                  </label>

                  <input
                    value={duration}
                    onChange={(event) =>
                      setDuration(event.target.value)
                    }
                    placeholder="00:30"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />

                </div>


                <div>

                  <label className="text-sm font-medium text-slate-300">
                    Tools
                  </label>

                  <input
                    value={tools}
                    onChange={(event) =>
                      setTools(event.target.value)
                    }
                    placeholder="AI Generation, CapCut"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />

                </div>

              </div>

            </div>

          </section>


          {/* Thumbnail */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Thumbnail
            </h2>


            <div className="mt-6 overflow-hidden rounded-2xl">

              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt={title}
                  className="aspect-video w-full object-cover"
                />
              )}

            </div>


            <label
              htmlFor="thumbnail"
              className="mt-5 inline-block cursor-pointer rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:border-cyan-400/40 hover:text-white"
            >
              Replace Thumbnail
            </label>


            <input
              id="thumbnail"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleThumbnailChange}
              className="hidden"
            />

          </section>


          {/* Video */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Video
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              Current video:
            </p>


            <p className="mt-2 truncate text-sm text-slate-400">
              {existingVideo?.video_path ||
                existingVideo?.video_url}
            </p>


            <label
              htmlFor="video"
              className="mt-5 inline-block cursor-pointer rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:border-cyan-400/40 hover:text-white"
            >
              Replace Video
            </label>


            <input
              id="video"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoChange}
              className="hidden"
            />


            {newVideo && (
              <p className="mt-3 text-sm text-cyan-400">
                New video: {newVideo.name}
              </p>
            )}

          </section>


          {/* Publishing */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Publishing
            </h2>


            <div className="mt-6 space-y-5">

              <label className="flex cursor-pointer gap-4">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-cyan-400"
                />

                <div>

                  <p className="text-sm font-medium">
                    Featured project
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Highlight this project.
                  </p>

                </div>

              </label>


              <label className="flex cursor-pointer gap-4">

                <input
                  type="checkbox"
                  checked={published}
                  onChange={(event) =>
                    setPublished(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-cyan-400"
                />

                <div>

                  <p className="text-sm font-medium">
                    Published
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Show this project on the public portfolio.
                  </p>

                </div>

              </label>

            </div>

          </section>


          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm text-slate-300 hover:text-white"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </main>

    </div>
  )
}


export default EditVideo