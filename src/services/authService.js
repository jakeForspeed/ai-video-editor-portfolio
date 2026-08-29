import { supabase } from "../lib/supabase"

const ADMIN_EMAIL = "robertjakematao@gmail.com"


export async function loginAdmin(email, password) {

  if (email.toLowerCase() !== ADMIN_EMAIL) {
    throw new Error("Invalid email or password.")
  }

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
    throw error
  }

  if (!data.user) {
    throw new Error("Unable to authenticate.")
  }

  return data.user
}


export async function logoutAdmin() {

  const { error } =
    await supabase.auth.signOut()

  if (error) {
    throw error
  }
}


export async function getCurrentAdmin() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  if (
    user.email?.toLowerCase() !==
    ADMIN_EMAIL
  ) {
    await supabase.auth.signOut()
    return null
  }

  return user
}