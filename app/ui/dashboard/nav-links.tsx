"use client";

import Lottie from "lottie-react";
import academicAnimation from "@/public/animations/Academic.json";
import expoAnimation from "@/public/animations/NeckTie.json";
import careerAnimation from "@/public/animations/Career.json";
import pluginAnimation from "@/public/animations/Plugin.json";
import exitAnimation from "@/public/animations/Exit.json";
import { useRef } from "react";


const AcademicIcon = ({ lottieRef }: { lottieRef: any }) => (
  <div className="w-10 h-10">
    <Lottie
      lottieRef={lottieRef}
      animationData={academicAnimation}
      autoplay={false}
      loop
    />
  </div>
);

const ExpoAnimation = ({ lottieRef }: { lottieRef: any }) => (
  <div className="w-10 h-10">
    <Lottie
      lottieRef={lottieRef}
      animationData={expoAnimation}
      autoplay={false}
      loop
    />
  </div>
);
const CareerAnimation = ({ lottieRef }: { lottieRef: any }) => (
  <div className="w-10 h-10">
    <Lottie
      lottieRef={lottieRef}
      animationData={careerAnimation}
      autoplay={false}
      loop
    />
  </div>
);

const PluginAnimation = ({ lottieRef }: { lottieRef: any }) => (
  <div className="w-10 h-10">
    <Lottie
      lottieRef={lottieRef}
      animationData={pluginAnimation}
      autoplay={false}
      loop
    />
  </div>
);

const ExitAnimation = ({ lottieRef }: { lottieRef: any }) => (
  <div className="w-8 h-8">
    <Lottie
      lottieRef={lottieRef}
      animationData={exitAnimation}
      autoplay={false}
      loop
    />
  </div>
);

const links = [
  {
    name: 'Carreras',
    href: '/ui/dashboard/Career',
    icon: CareerAnimation,
  },
  {
    name: 'Registro de Cursos',
    href: '/ui/dashboard/Course',
    icon: PluginAnimation,
  },
  {
    name: 'Registro de Graduados',
    href: '/ui/dashboard/Graduates',
    icon: AcademicIcon,
  },
  {
    name: 'Registro de Expositores',
    href: '/ui/dashboard/Exhibitors',
    icon: ExpoAnimation,
  },
  {
    name: 'Cerrar Sesión',
    href: '/ui/login',
    icon: ExitAnimation,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const IconComponent = link.icon;
        const lottieRef = useRef<any>(null);

        const handleMouseEnter = () => {
          lottieRef.current?.play();
        };

        const handleMouseLeave = () => {
          lottieRef.current?.stop();
        };

        return (
          <a
            key={link.name}
            href={link.href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white/20 backdrop-blur-md border border-white/30 p-3 text-sm font-medium text-white 
                     hover:bg-white/30 hover:text-indigo-400 
                     md:flex-none md:justify-start md:p-2 md:px-3 
                     transition-all duration-300"
          >
            <IconComponent lottieRef={lottieRef} />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}


