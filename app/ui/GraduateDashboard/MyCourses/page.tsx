    "use client";

    import { useEffect, useState } from "react";

    interface Curso {
    curso_id: number;
    categoria: string;
    nombre: string;
    descripcion: string;
    fecha: string; // formato YYYY-MM-DD
    hora_ini: string;
    hora_fin: string;
    modalidad: string;
    }

    export default function MisCursosPage() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const fetchCursos = async () => {
        try {
            const usuario_id = Number(localStorage.getItem("usuario_id")); // Asegúrate de guardar este ID al hacer login
            if (!usuario_id) {
            console.error("ID de usuario no encontrado.");
            return;
            }

            const res = await fetch("/api/mycourses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario_id }),
            });

            if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al obtener cursos");
            }

            const data = await res.json();
            setCursos(data);
        } catch (error) {
            console.error("Error al cargar cursos:", error);
        }
        };

        fetchCursos();
    }, []);

    const cursosFiltrados = cursos.filter((c) =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="glassmorphism p-6 rounded-2xl border border-white/30 text-white max-w-6xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Mis Cursos Registrados</h2>

            <input
                type="text"
                placeholder="Buscar curso por nombre"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-glass w-full mb-6"
            />

            {cursosFiltrados.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cursosFiltrados.map((curso) => (
                        <li
                            key={curso.curso_id}
                            className="p-4 rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-[#6c63ff]/30 via-indigo-500/20 to-purple-500/20 shadow-lg transition-all duration-200 hover:scale-[1.03]"
                        >
                            <p className="font-bold text-lg">{curso.nombre}</p>
                            <p className="text-sm text-white/70 italic">{curso.categoria}</p>
                            <p className="text-sm mt-1">{curso.descripcion}</p>
                            <p className="text-sm mt-1">
                                <strong>Fecha:</strong> {new Date(curso.fecha).toLocaleDateString()}
                            </p>
                            <p className="text-sm">
                                <strong>Horario:</strong> {curso.hora_ini} - {curso.hora_fin}
                            </p>
                            <p className="text-sm">
                                <strong>Modalidad:</strong> {curso.modalidad}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="italic text-sm">No hay cursos registrados o no coinciden con la búsqueda.</p>
            )}
        </div>
    );
}
