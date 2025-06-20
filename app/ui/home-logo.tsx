"use client";

import { montserrat } from '@/app/ui/fonts';
import Lottie from "lottie-react";
import homeAnimation from "@/public/animations/Home.json";
import { useRef } from "react";

export default function HomeLogo() {
  const lottieRef = useRef<any>(null);

  return (
    <div
      className={`${montserrat.className} flex flex-row items-center leading-none text-white`}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rotate-[15deg]">
        <Lottie
          lottieRef={lottieRef}
          animationData={homeAnimation}
          autoplay={false}
          loop
        />
      </div>
      <p className="text-lg sm:text-2xl md:text-[44px] ml-2">Inicio</p>
    </div>
  );
}

