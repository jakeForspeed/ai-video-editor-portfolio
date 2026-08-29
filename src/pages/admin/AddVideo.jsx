import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  createSlug,
  createVideo,
  deleteFile,
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


function AddVideo() {

  const navigate = useNavigate()


  const [title, setTitle] = useState("")

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


  const [thumbnail, setThumbnail] =
    useState(null)

  const [video, setVideo] =
    useState(null)


  const [thumbnailPreview, setThumbnailPreview] =
    useState("")


  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")


  function handleThumbnailChange(event) {

    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a valid image file."
      )

      return
    }

    setThumbnail(file)

    setThumbnailPreview(
      URL.createObjectURL(file)
    )

    setError("")
  }


  function handleVideoChange(event) {

    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("video/")) {

      setError(
        "Please select a valid video file."
      )

      return
    }

    setVideo(file)

    setError("")
  }


  async function handleSubmit(event) {

    event.preventDefault()

    setError("")


    if (!title.trim()) {

      setError(
        "Please enter a video title."
      )

      return
    }


    if (!thumbnail) {

      setError(
        "Please select a thumbnail."
      )

      return
    }


    if (!video) {

      setError(
        "Please select a video."
      )

      return
    }


    setLoading(true)


    let uploadedVideo = null
    let uploadedThumbnail = null


    try {

      /*
       * 1. Create a slug
       */
      const slug = createSlug(title)


      /*
       * 2. Upload video
       */
      uploadedVideo = await uploadFile(
        video,
        "videos"
      )


      /*
       * 3. Upload thumbnail
       */
      uploadedThumbnail = await uploadFile(
        thumbnail,
        "thumbnails"
      )


      /*
       * 4. Convert tools into an array
       */
      const toolsArray = tools
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean)


      /*
       * 5. Create database record
       */
      await createVideo({
        title: title.trim(),

        slug,

        category,

        description:
            description.trim(),

        video_url:
            uploadedVideo.url,

        video_path:
            uploadedVideo.path,

        thumbnail_url:
            uploadedThumbnail.url,

        thumbnail_path:
            uploadedThumbnail.path,

        duration:
            duration.trim(),

        tools:
            toolsArray,

        featured,

        published,
        })


      /*
       * 6. Go back to dashboard
       */
      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      )


    } catch (error) {

      console.error(
        "Failed to create video:",
        error
      )


      /*
       * If database insertion failed
       * after uploading the files,
       * clean the uploaded files.
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
          "Storage cleanup failed:",
          cleanupError
        )

      }


      setError(
        error.message ||
        "Failed to create video."
      )

    } finally {

      setLoading(false)

    }
  }


  return (
    <div className="min-h-screen pt-20">

      {/* Header */}
      <header className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

          <Link
            to="/admin/dashboard"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-5 text-3xl font-bold">
            Add Video
          </h1>

          <p className="mt-2 text-slate-400">
            Add a new project to your portfolio.
          </p>

        </div>

      </header>


      {/* Form */}
      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

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


          {/* Basic Information */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Project Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about your video.
            </p>


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
                    setTitle(event.target.value)
                  }
                  placeholder="MotoShine Product Advertisement"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
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
                    setCategory(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
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
                    setDescription(event.target.value)
                  }
                  placeholder="Describe the project..."
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                />

              </div>


              {/* Duration + Tools */}
              <div className="grid gap-6 sm:grid-cols-2">

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
                      setDuration(event.target.value)
                    }
                    placeholder="00:30"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                  />

                </div>


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
                      setTools(event.target.value)
                    }
                    placeholder="AI Generation, CapCut"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
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
              Upload an image that represents your project.
            </p>


            <div className="mt-6">

              {thumbnailPreview ? (

                <div className="overflow-hidden rounded-2xl border border-white/10">

                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="aspect-video w-full object-cover"
                  />

                </div>

              ) : (

                <label
                  htmlFor="thumbnail"
                  className="flex aspect-video cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
                >

                  <div className="text-center">

                    <p className="font-medium text-white">
                      Choose thumbnail
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      JPG, PNG, or WebP
                    </p>

                  </div>

                </label>

              )}


              <input
                id="thumbnail"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleThumbnailChange}
                className="hidden"
              />


              {thumbnailPreview && (
                <label
                  htmlFor="thumbnail"
                  className="mt-4 inline-block cursor-pointer text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  Change thumbnail
                </label>
              )}

            </div>

          </section>


          {/* Video */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Video
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload the final MP4 video.
            </p>


            <label
              htmlFor="video"
              className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-16 text-center transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
            >

              {video ? (

                <>
                  <p className="font-medium text-white">
                    {video.name}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {(
                      video.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </p>

                  <p className="mt-4 text-sm text-cyan-400">
                    Click to change video
                  </p>
                </>

              ) : (

                <>
                  <p className="font-medium text-white">
                    Choose video
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    MP4 recommended
                  </p>
                </>

              )}

            </label>


            <input
              id="video"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoChange}
              className="hidden"
            />

          </section>


          {/* Publishing */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <h2 className="text-xl font-semibold">
              Publishing
            </h2>


            <div className="mt-6 space-y-5">

              {/* Featured */}
              <label className="flex cursor-pointer items-start gap-4">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(event.target.checked)
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
                    setPublished(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-cyan-400"
                />

                <div>

                  <p className="text-sm font-medium text-white">
                    Publish immediately
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Make this project visible on your public portfolio.
                  </p>

                </div>

              </label>

            </div>

          </section>


          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Uploading..."
                : "Publish Video"}
            </button>

          </div>

        </form>

      </main>

    </div>
  )
}

export default AddVideo