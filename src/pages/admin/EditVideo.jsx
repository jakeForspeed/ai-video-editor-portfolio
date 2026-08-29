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

  const [newVideo, setNewVideo] =
    useState(null)

  const [newThumbnail, setNewThumbnail] =
    useState(null)

  const [thumbnailPreview, setThumbnailPreview] =
    useState("")


  /*
   * Load video
   */
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


        setTitle(
          video.title || ""
        )


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

        console.error(
          "Failed to load video:",
          error
        )


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


  /*
   * Thumbnail change
   */
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


  /*
   * Video change
   */
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


  /*
   * Submit
   */
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
       * Slug
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
            (tool) =>
              tool.trim()
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
       * only after database update succeeds.
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
        "/admin/portfolio",
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
       * Remove newly uploaded files
       * if database update failed.
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


  /*
   * Loading state
   */
  if (loading) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

          <p className="mt-5 text-sm text-slate-500">
            Loading video...
          </p>

        </div>

      </div>
    )

  }


  /*
   * Video not found
   */
  if (error && !existingVideo) {

    return (
      <div className="py-10">

        <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">

          <p className="text-red-300">
            {error}
          </p>

        </div>


        <Link
          to="/admin/portfolio"
          className="mt-6 inline-block text-sm text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to Portfolio
        </Link>

      </div>
    )

  }


  return (
    <div className="py-2">

      {/* Header */}
      <header className="border-b border-white/10 pb-8">


        <div className="mt-5">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Portfolio
          </p>


          <h1 className="mt-2 text-3xl font-bold">
            Edit Video
          </h1>


          <p className="mt-2 text-slate-400">
            Update your portfolio project.
          </p>

        </div>

      </header>


      {/* Form */}
      <main className="py-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}


          {/* Project Information */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <div>

              <h2 className="text-xl font-semibold">
                Project Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the basic information about this video.
              </p>

            </div>


            <div className="mt-8 space-y-6">

              {/* Title */}
              <div>

                <label
                  htmlFor="title"
                  className="text-sm font-medium text-slate-300"
                >
                  Title
                </label>


                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/50"
                />

              </div>


              {/* Category */}
              <div>

                <label
                  htmlFor="category"
                  className="text-sm font-medium text-slate-300"
                >
                  Category
                </label>


                <select
                  id="category"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
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


              {/* Description */}
              <div>

                <label
                  htmlFor="description"
                  className="text-sm font-medium text-slate-300"
                >
                  Description
                </label>


                <textarea
                  id="description"
                  rows="5"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                />

              </div>


              {/* Duration + Tools */}
              <div className="grid gap-6 sm:grid-cols-2">

                {/* Duration */}
                <div>

                  <label
                    htmlFor="duration"
                    className="text-sm font-medium text-slate-300"
                  >
                    Duration
                  </label>


                  <input
                    id="duration"
                    type="text"
                    value={duration}
                    onChange={(event) =>
                      setDuration(
                        event.target.value
                      )
                    }
                    placeholder="00:30"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  />

                </div>


                {/* Tools */}
                <div>

                  <label
                    htmlFor="tools"
                    className="text-sm font-medium text-slate-300"
                  >
                    Tools
                  </label>


                  <input
                    id="tools"
                    type="text"
                    value={tools}
                    onChange={(event) =>
                      setTools(
                        event.target.value
                      )
                    }
                    placeholder="AI Generation, CapCut"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  />


                  <p className="mt-2 text-xs text-slate-600">
                    Separate tools with commas.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* Thumbnail */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Thumbnail
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              Replace the current project thumbnail.
            </p>


            {thumbnailPreview && (

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">

                <img
                  src={thumbnailPreview}
                  alt={title}
                  className="aspect-video w-full object-cover"
                />

              </div>

            )}


            <label
              htmlFor="thumbnail"
              className="mt-5 inline-block cursor-pointer rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
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


            {newThumbnail && (

              <p className="mt-3 text-sm text-cyan-400">
                New thumbnail selected:{" "}
                {newThumbnail.name}
              </p>

            )}

          </section>


          {/* Video */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Video
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              Replace the current video file.
            </p>


            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">

              <p className="text-xs uppercase tracking-wider text-slate-600">
                Current Video
              </p>


              <p className="mt-2 truncate text-sm text-slate-400">
                {existingVideo?.video_path ||
                  existingVideo?.video_url}
              </p>

            </div>


            <label
              htmlFor="video"
              className="mt-5 inline-block cursor-pointer rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
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

              <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3">

                <p className="text-sm text-cyan-400">
                  New video selected
                </p>

                <p className="mt-1 truncate text-sm text-slate-400">
                  {newVideo.name}
                </p>

              </div>

            )}

          </section>


          {/* Publishing */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Publishing
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              Control how this project appears on your website.
            </p>


            <div className="mt-6 space-y-5">

              {/* Featured */}
              <label className="flex cursor-pointer items-start gap-4">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(
                      event.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 accent-cyan-400"
                />


                <div>

                  <p className="text-sm font-medium text-white">
                    Featured project
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Highlight this project on your website.
                  </p>

                </div>

              </label>


              {/* Published */}
              <label className="flex cursor-pointer items-start gap-4">

                <input
                  type="checkbox"
                  checked={published}
                  onChange={(event) =>
                    setPublished(
                      event.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 accent-cyan-400"
                />


                <div>

                  <p className="text-sm font-medium text-white">
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
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-end">

            <Link
              to="/admin/portfolio"
              className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
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
