  "use client";

  import { useEffect, useState } from "react";

  interface Carrera {
    carrera_id: number;
    nombre: string;
    area: string;
  }

  export default function MisCarrerasPage() {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
      const fetchCarreras = async () => {
        const usuario_id = localStorage.getItem("usuario_id");

        if (!usuario_id) {
          console.error("ID de usuario no encontrado.");
          return;
        }

        try {
          const res = await fetch("/api/mycareers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario_id }),
          });

          if (!res.ok) {
            throw new Error("Error al obtener las carreras.");
          }

          const data = await res.json();
          setCarreras(data);
        } catch (error) {
          console.error("Error al cargar carreras:", error);
        }
      };

      fetchCarreras();
    }, []);

    const carrerasFiltradas = carreras.filter((c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <div className="glassmorphism p-6 rounded-2xl border border-white/30 text-white max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Mis Carreras Registradas</h2>

      <input
        type="text"
        placeholder="Buscar carrera por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-glass w-full mb-6"
      />

      {carrerasFiltradas.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {carrerasFiltradas.map((c) => (
            <li
              key={c.carrera_id}
              className="p-4 rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-[#6c63ff]/30 via-indigo-500/20 to-purple-500/20 shadow-lg transition-all duration-200 hover:scale-[1.03]"
            >
              <p className="font-bold">{c.nombre}</p>
              <p className="text-sm text-white/70">{c.area}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-sm">No hay carreras registradas o no coinciden con la búsqueda.</p>
      )}
    </div>
  );
}
