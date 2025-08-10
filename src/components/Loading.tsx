import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.svg";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  fullScreen = true,
}) => {
  const containerClass = fullScreen
    ? "fixed inset-0 bg-black z-50 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  // Animation variants for the loading dots
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  // Animation variants for the logo
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
    },
  };

  // Animation variants for the pulse effect around logo
  const pulseVariants = {
    initial: { scale: 0.8, opacity: 0.3 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.3, 0.1, 0.3],
    },
  };

  // Animation variants for the progress bar
  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: ["0%", "70%", "90%", "100%"],
    },
  };

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-8">
        {/* Logo with pulse effect */}
        <div className="relative">
          {/* Pulse background effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "blur(20px)",
              zIndex: -1,
            }}
          />

          {/* Main logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative z-10"
          >
            <img src={Logo} alt="Shopp Logo" className="h-16 w-auto" />
          </motion.div>
        </div>

        {/* Loading text with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-white text-2xl font-bold mb-2">{message}</h2>
          <p className="text-gray-300 text-sm">
            Please wait while we prepare your experience
          </p>
        </motion.div>

        {/* Animated loading dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-purple-500 rounded-full"
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Spinning loader (alternative design) */}
        <motion.div
          className="w-8 h-8 border-2 border-gray-600 border-t-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default Loading;
