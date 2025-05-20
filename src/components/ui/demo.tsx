"use client";
import AnimatedGradientBackground from "./animated-gradient-background";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

const DemoVariant1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background */}
      <AnimatedGradientBackground />

      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-32 text-center">
        <div>
          <DotLottieReact
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            loop
            autoplay
          />
        </div>
        <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-lg">
          A customizable animated radial gradient background with a subtle
          breathing effect.
        </p>
      </div>
    </div>
  );
};

export { DemoVariant1 };
