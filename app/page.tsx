import { AcademicCapIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-950 to-gray-800 text-white overflow-hidden flex flex-col">

      {/* Círculos animados */}
      <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-700 opacity-15 blur-3xl rounded-full z-0 animate-float-blob" />
      <div className="absolute top-[-100px] right-[-80px] w-[350px] h-[350px] bg-indigo-500 opacity-25 blur-3xl rounded-full z-0 animate-float-blob" />

      {/* Header glass con efecto degradado colorido */}
      <div className="w-full px-4 sm:px-3 py-3 flex-1">
        <header
          className=" w-full rounded-xl py-4 px-6 text-left select-none z-10 border border-white/20 backdrop-blur-xl drop-shadow-lg bg-gradient-to-r from-purple-600/30 via-indigo-500/30 to-purple-600/30 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
          <span className="text-4xl font-bold">Red Integral Graduados</span>
        </header>
      </div>


      {/* Panel principal */}
      <div className="w-full px-4 sm:px-6 py-6 flex-1">
        <main className="max-w-full mx-auto relative z-10 flex flex-col md:flex-row bg-white/10 border border-white/20 backdrop-blur-xl drop-shadow-4xl rounded-3xl p-6 md:p-10 gap-6 md:gap-8">

          <section className="flex flex-col justify-between flex-1 text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Red Integral de Graduados
              </h1>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-prose">
                Bienvenido al panel principal del Sistema Integral de Registro de Graduados y Gestión de Talleres.
                Aquí podrás gestionar la información personal y académica de los graduados, así como administrar la oferta de talleres de formación continua.
                Nuestro sistema facilita la organización de datos, preferencias y participación en actividades de actualización,
                brindando una plataforma moderna y segura para mantener el vínculo entre la universidad y sus egresados.

              </p>
            </div>

            <Link
              href="/ui/login"
              className="mt-6 sm:mt-8 inline-flex items-center bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-300 gap-2"
            >
              <ArrowRightIcon className="w-5 h-5" />
              Ir al Portal
            </Link>

          </section>

          <section className="flex flex-1 items-center justify-center mt-6 md:mt-0">
            <AcademicCapIcon
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-lg animate-rotate3d"
              style={{
                filter: 'drop-shadow(4px 4px 4px rgba(0,0,0,0.6))',
                background: 'radial-gradient(circle at 30% 30%, #60a5fa, #1e40af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
          </section>
        </main>
      </div>


      <footer
        className=" w-full rounded-t-xl bg-gradient-to-r from-purple-600/30 via-indigo-500/30 to-purple-600/30 backdrop-blur-xl border-t border-white/20
                    drop-shadow-lg py-4 px-6 text-gray-200 select-none z-10 flex items-center justify-between transition-shadow duration-300 hover:shadow-2xl "
      >
        <div className="text-left text-sm sm:text-base max-w-[70%]">
          Proyecto de Programación 4 - Universidad Nacional (UNA) <br />
          Creado por: Makin Artavia, Reyner Rojas, Cipriano Rivera. <br />
          Profesor: Juan Gamboa Abarca - I Semestre 2025
        </div>
        <div className="max-w-[100px]">
          <img
            src="/LOGO-UNA.png"
            alt="Logo UNA"
            className="w-full h-auto object-contain"
          />
        </div>
      </footer>



    </div>
  );
}





