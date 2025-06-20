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
        // Datos de prueba simulados
        const mockCursos: Curso[] = [
            {
                curso_id: 1,
                categoria: "Tecnología",
                nombre: "Introducción a React",
                descripcion: "Curso básico para aprender los fundamentos de React.js",
                fecha: "2025-06-20",
                hora_ini: "09:00",
                hora_fin: "12:00",
                modalidad: "Virtual",
            },
            {
                curso_id: 2,
                categoria: "Desarrollo Personal",
                nombre: "Oratoria Profesional",
                descripcion: "Mejora tus habilidades de comunicación en público",
                fecha: "2025-07-01",
                hora_ini: "13:30",
                hora_fin: "16:00",
                modalidad: "Presencial",
            },
            {
                curso_id: 3,
                categoria: "Arte",
                nombre: "Fotografía Digital Avanzada",
                descripcion: "Técnicas avanzadas de fotografía digital y edición",
                fecha: "2025-08-15",
                hora_ini: "10:00",
                hora_fin: "13:00",
                modalidad: "Virtual",
            },
            {
                curso_id: 4,
                categoria: "Negocios",
                nombre: "Marketing Digital para Emprendedores",
                descripcion: "Estrategias de marketing digital para startups, diseño de estrategias, modelos de negocio y ventas, Aprende a crear campañas efectivasS",
                fecha: "2025-09-05",
                hora_ini: "14:00",
                hora_fin: "17:00",
                modalidad: "Presencial",
            },
        ];
        setCursos(mockCursos);
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
