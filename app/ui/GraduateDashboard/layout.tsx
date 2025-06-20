import SideNavGraduates from "./sidenavG";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-950 to-gray-800 text-white flex flex-col md:flex-row">
      {/* Bolitas decorativas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-30 blur-3xl rounded-full animate-float-blob" />
        <div className="absolute top-[-100px] right-[-80px] w-[300px] h-[300px] bg-indigo-500 opacity-25 blur-3xl rounded-full animate-float-blob" />
      </div>

      {/* Barra lateral */}
      <div className="w-full md:w-64 min-h-0 md:min-h-screen overflow-hidden z-10">
        <SideNavGraduates />
      </div>

      {/* Contenido principal */}
      <div className="flex-grow z-10 p-4 md:p-6 overflow-auto max-h-[calc(100vh-0px)]">
        {children}
      </div>
    </div>
  );
}






 