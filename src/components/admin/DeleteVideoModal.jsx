function DeleteVideoModal({
  video,
  deleting,
  onCancel,
  onConfirm,
}) {

  if (!video) {
    return null
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-7 shadow-2xl">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-xl text-red-400">
          !
        </div>


        <h2 className="mt-5 text-xl font-bold">
          Delete this video?
        </h2>


        <p className="mt-3 text-sm leading-6 text-slate-400">
          This will permanently delete:
        </p>


        <p className="mt-2 font-medium text-white">
          {video.title}
        </p>


        <p className="mt-3 text-sm leading-6 text-slate-500">
          The video, thumbnail, and database record will be removed.
          This action cannot be undone.
        </p>


        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting
              ? "Deleting..."
              : "Delete Video"}
          </button>

        </div>

      </div>

    </div>
  )
}


export default DeleteVideoModal