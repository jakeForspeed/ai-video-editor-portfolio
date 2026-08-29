import { supabase } from "../lib/supabase"


const ADMIN_EMAIL =
  "robertjakematao@gmail.com"



/**
 * Login admin
 */
export async function loginAdmin(
  email,
  password
) {

  const normalizedEmail =
    email.trim().toLowerCase()


  /*
   * Only allow the configured
   * admin email.
   */
  if (
    normalizedEmail !==
    ADMIN_EMAIL
  ) {
    throw new Error(
      "Invalid email or password."
    )
  }


  const {
    data,
    error,
  } =
    await supabase.auth.signInWithPassword({

      email: normalizedEmail,

      password,

    })


  if (error) {
    throw error
  }


  if (!data.user) {

    throw new Error(
      "Unable to authenticate."
    )

  }


  /*
   * Extra safety check.
   */
  if (
    data.user.email?.toLowerCase() !==
    ADMIN_EMAIL
  ) {

    await supabase.auth.signOut()

    throw new Error(
      "Unauthorized administrator."
    )

  }


  return data.user

}



/**
 * Logout admin
 */
export async function logoutAdmin() {

  const {
    error,
  } =
    await supabase.auth.signOut()


  if (error) {
    throw error
  }

}



/**
 * Get currently authenticated admin
 */
export async function getCurrentAdmin() {

  try {

    const {
      data,
      error,
    } =
      await supabase.auth.getUser()


    /*
     * Supabase couldn't verify
     * the current user.
     */
    if (error) {

      console.error(
        "Failed to get current user:",
        error
      )

      return null

    }


    const user =
      data?.user


    /*
     * No authenticated user.
     */
    if (!user) {
      return null
    }


    /*
     * Make sure the authenticated
     * account is our admin account.
     */
    if (
      user.email?.toLowerCase() !==
      ADMIN_EMAIL
    ) {

      await supabase.auth.signOut()

      return null

    }


    return user


  } catch (error) {

    console.error(
      "Authentication check failed:",
      error
    )

    return null

  }

}
