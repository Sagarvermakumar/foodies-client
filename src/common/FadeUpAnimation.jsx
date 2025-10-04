

import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const FadeUpAnimation = ({ title, children, duration = 0.6 }) => {

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: duration,
        ease: "easeOut"
      }
    })
  }
  return (
    <MotionBox
      key={title}
      custom={title}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}

    >
      {children}
    </MotionBox>
  )
}

export default FadeUpAnimation