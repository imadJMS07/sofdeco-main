import React from "react";
import { motion } from "framer-motion";

import { COLORS } from '@/constants/colors';
export const Loading = () => {
  const letters = "SOFDECO".split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04 * i,
      },
    }),
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      color: COLORS.primary,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      color: [COLORS.primary, COLORS.secondary, COLORS.accent],
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 250,
        color: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        scale: {
          duration: 0.5,
        },
      },
    },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className="loader-container"
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        backgroundColor: "#ffffff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: `linear-gradient(135deg, #ffffff, #f5f5f5, #fafafa)`,
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          background: `repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 10px)`,
          pointerEvents: "none",
        }}
      />
      
      <motion.div
        className="letters-container"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "clamp(1.5rem, 4vw, 4rem)",
          maxWidth: "100%"
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="letter"
            variants={letterVariants}
            custom={index}
            style={{
              color: COLORS.primary,
              fontSize: "clamp(3rem, 8vw, 10rem)",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              margin: "clamp(0.3rem, 0.7vw, 1.2rem)",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.05em",
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            {letter}
            {index < letters.length && (
              <motion.span
                className="dot"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0.7, 1],
                  backgroundColor: [
                    COLORS.primary,
                    COLORS.accent,
                    COLORS.secondary,
                  ],
                  boxShadow: [
                    `0 0 8px ${COLORS.primary}50`,
                    `0 0 10px ${COLORS.accent}50`,
                    `0 0 8px ${COLORS.secondary}50`
                  ],
                  transition: {
                    delay: 0.3 + index * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  },
                }}
                style={{
                  position: "absolute",
                  width: "clamp(0.4rem, 0.8vw, 1rem)",
                  height: "clamp(0.4rem, 0.8vw, 1rem)",
                  borderRadius: "50%",
                  bottom: "clamp(-1rem, -2vw, -2rem)",
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              />
            )}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};
