export default function DashboardLayout() {
  return (
    <div className="w-full max-w-5xl bg-white/10 border border-white/20 backdrop-blur-xl drop-shadow-2xl rounded-2xl p-8 space-y-6 mx-auto my-12">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">Bienvenido al Dashboard</h1>
      <p className="mb-6 text-lg text-gray-300">
        Aquí puedes acceder a todas las funcionalidades de gestión de graduados y talleres.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-indigo-300">Funcionalidades del Sistema</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-200">
          <li>
            <strong>Módulo de Registro de Carreras:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Agregar nuevas carreras.</li>
              <li>Consultar lista de carreras.</li>
              <li>Editar y eliminar carreras.</li>
            </ul>
          </li>

          <li>
            <strong>Módulo de Gestión de Cursos:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Agregar nuevas cursos.</li>
              <li>Consultar lista de cursos.</li>
              <li>Editar y eliminar cursos.</li>
            </ul>
          </li>

          <li>
            <strong>Módulo de Registro de Graduados:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Agregar nuevos graduados.</li>
              <li>Consultar lista de graduados.</li>
              <li>Editar y eliminar graduados.</li>
              <li>Usuarios (Crear, Editar, Eliminar).</li>
            </ul>
          </li>

          <li>
            <strong>Módulo de Registro de Expositores:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Agregar nuevos expositores.</li>
              <li>Consultar lista de expositores.</li>
              <li>Editar y eliminar expositores.</li>
            </ul>
          </li>

        </ol>
      </section>
    </div>
  );
}

