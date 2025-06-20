export default function DashboardLayout() {
  return (
    <div className="w-full max-w-5xl bg-white/10 border border-white/20 backdrop-blur-xl drop-shadow-2xl rounded-2xl p-8 space-y-6 mx-auto my-12">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">Bienvenido al Dashboard de Graduados</h1>
      <p className="mb-6 text-lg text-gray-300">
        Aquí puedes acceder a todas las funcionalidades disponibles para graduados.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-indigo-300">Funcionalidades del Sistema</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-200">
          <li>
            <strong>Módulo Mis Carreras:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Ver lista de Carreras.</li>
              <li>Consular datos de las Carreras.</li>
            </ul>
          </li>

          <li>
            <strong>Módulo Mis Cursos:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Ver lista de Cursos asignados.</li>
              <li>Consultar Informacion General de los cursos.</li>
            </ul>
          </li>

          <li>
            <strong>Módulo Mis Datos:</strong>
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
              <li>Consultar Informacion personal.</li>
              <li>Editar Informacion personal.</li>
              <li>Cambiar contraseña de Usuario.</li>
            </ul>
          </li>
        </ol>
      </section>
    </div>
  );
}

