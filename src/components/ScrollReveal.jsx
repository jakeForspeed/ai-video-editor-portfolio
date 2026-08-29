import {
  motion,
  useReducedMotion,
} from "motion/react"


function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  className = "",
}) {

    const shouldReduceMotion =
  useReducedMotion()
  
  const directions = {
    up: {
      x: 0,
      y: distance,
    },

    down: {
      x: 0,
      y: -distance,
    },

    left: {
      x: distance,
      y: 0,
    },

    right: {
      x: -distance,
      y: 0,
    },

    fade: {
      x: 0,
      y: 0,
    },
  }


  const initial =
    directions[direction] ||
    directions.up


  return (
    <motion.div
  initial={
    shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          ...initial,
        }
  }

  whileInView={{
    opacity: 1,
    x: 0,
    y: 0,
  }}

  viewport={{
    once,
    amount: 0.15,
  }}

  transition={{
    duration: shouldReduceMotion
      ? 0.2
      : duration,

    delay: shouldReduceMotion
      ? 0
      : delay,

    ease: [0.22, 1, 0.36, 1],
  }}

  className={className}
>
      {children}
    </motion.div>
  )
}


export default ScrollReveal