import { supabase } from "../lib/supabase"


/**
 * Get published videos for the public portfolio
 */
export async function getVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    })

  if (error) {
    throw error
  }

  return data
}


/**
 * Get all videos for the admin dashboard
 */
export async function getAllVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", {
      ascending: false,
    })

  if (error) {
    throw error
  }

  return data
}


/**
 * Get a single published video
 */
export async function getVideoBySlug(slug) {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    throw error
  }

  return data
}


/**
 * Create a URL-safe slug
 */
export function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}


/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  file,
  bucket,
  folder = ""
) {
  if (!file) {
    throw new Error("No file selected.")
  }

  const fileExtension =
    file.name.split(".").pop()?.toLowerCase() || ""

  const fileName =
    `${crypto.randomUUID()}.${fileExtension}`

  const filePath = folder
    ? `${folder}/${fileName}`
    : fileName

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    throw error
  }

  const {
    data: publicUrlData,
  } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return {
    path: filePath,
    url: publicUrlData.publicUrl,
  }
}


/**
 * Delete a file from Storage
 */
export async function deleteFile(
  bucket,
  path
) {
  if (!path) {
    return
  }

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw error
  }
}


/**
 * Create a video record
 */
export async function createVideo(video) {
  const { data, error } = await supabase
    .from("videos")
    .insert(video)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}


/**
 * Update a video record
 */
export async function updateVideo(id, updates) {
  const { data, error } = await supabase
    .from("videos")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}


/**
 * Delete a video record
 */
export async function deleteVideo(id) {
  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("id", id)

  if (error) {
    throw error
  }
}