import { useEffect, useState } from "react"
import { motion } from "motion/react"

import ScrollReveal from "../../components/ScrollReveal"
import { getContactMessages } from "../../services/contactService"


function AdminMessages() {

  const [messages, setMessages] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  useEffect(() => {

    async function loadMessages() {

      try {

        setError("")

        const data =
          await getContactMessages()

        setMessages(data)

      } catch (error) {

        console.error(
          "Failed to load messages:",
          error
        )

        setError(
          "Unable to load contact messages."
        )

      } finally {

        setLoading(false)

      }

    }


    loadMessages()

  }, [])


  return (

    <div className="space-y-8">

      {/* Header */}

      <ScrollReveal direction="up">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Inbox
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Client Messages
          </h1>

          <p className="mt-2 text-slate-400">
            Messages submitted through your portfolio contact form.
          </p>

        </div>

      </ScrollReveal>



      {/* Loading */}

      {loading && (

        <div className="space-y-4">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="
                h-40
                animate-pulse
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
              "
            />

          ))}

        </div>

      )}



      {/* Error */}

      {!loading && error && (

        <div
          className="
            rounded-2xl
            border
            border-red-400/20
            bg-red-400/5
            p-6
            text-sm
            text-red-300
          "
        >

          {error}

        </div>

      )}



      {/* Empty */}

      {!loading &&
        !error &&
        messages.length === 0 && (

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-12
              text-center
            "
          >

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-slate-500">

              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />

              </svg>

            </div>


            <h2 className="mt-5 text-lg font-semibold text-white">
              No messages yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Client inquiries will appear here.
            </p>

          </div>

        )}



      {/* Messages */}

      {!loading &&
        !error &&
        messages.length > 0 && (

          <div className="space-y-5">

            {messages.map((message, index) => (

              <motion.article

                key={message.id}

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}

                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  p-6
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.035]
                "
              >

                {/* Top */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <h2 className="text-lg font-semibold text-white">
                      {message.name}
                    </h2>

                    <a
                      href={`mailto:${message.email}`}
                      className="
                        mt-1
                        inline-block
                        text-sm
                        text-cyan-400
                        transition
                        hover:text-cyan-300
                      "
                    >
                      {message.email}
                    </a>

                  </div>


                  <span className="
                    w-fit
                    rounded-full
                    bg-cyan-400/10
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-cyan-400
                  ">
                    {message.project_type}
                  </span>

                </div>



                {/* Divider */}

                <div className="my-5 h-px bg-white/10" />



                {/* Message */}

                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {message.message}
                </p>



                {/* Date */}

                <p className="mt-5 text-xs text-slate-600">

                  {new Date(
                    message.created_at
                  ).toLocaleString()}

                </p>

              </motion.article>

            ))}

          </div>

        )}

    </div>
  )
}


export default AdminMessages