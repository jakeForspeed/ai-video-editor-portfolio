import emailjs from "@emailjs/browser"


const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID

const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY


export async function sendContactEmail({
  name,
  email,
  project_type,
  message,
}) {

  if (
    !SERVICE_ID ||
    !TEMPLATE_ID ||
    !PUBLIC_KEY
  ) {
    throw new Error(
      "EmailJS environment variables are missing."
    )
  }


  const templateParams = {

    name,

    email,

    project_type,

    message,

  }


  const response =
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      {
        publicKey: PUBLIC_KEY,
      }
    )


  return response
}
