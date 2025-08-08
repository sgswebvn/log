"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"

export function SlideInLeft({ children, delay=0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

export function FadeUp({ children, delay=0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
