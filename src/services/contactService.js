import { supabase } from "../lib/supabase"


/**
 * Submit a contact message
 */
export async function createContactMessage({
  name,
  email,
  projectType,
  message,
}) {

  const { error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name: name.trim(),
        email: email.trim(),
        project_type: projectType,
        message: message.trim(),
      },
    ])


  if (error) {

    console.error(
      "Failed to submit contact message:",
      error
    )

    throw error
  }


  return true
}





/**
 * Get contact messages
 *
 * Admin only.
 * Supabase RLS controls access.
 */
export async function getContactMessages() {

  const { data, error } =
    await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", {
        ascending: false,
      })


  if (error) {

    console.error(
      "Failed to load contact messages:",
      error
    )

    throw error
  }


  return data
}


/**
 * Delete a contact message
 *
 * Admin only.
 * Supabase RLS controls access.
 */
export async function deleteContactMessage(id) {

  const { error } =
    await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id)


  if (error) {

    console.error(
      "Failed to delete contact message:",
      error
    )

    throw error
  }


  return true
}