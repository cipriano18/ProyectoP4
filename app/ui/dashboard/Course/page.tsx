"use client";

import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Curso {
  curso_id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora_ini: string;
  hora_fin: string;
  modalidad: string;
}

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [form, setForm] = useState<Partial<Curso>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");

  // ✅ Cargar cursos al inicio
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCursos(data))
      .catch((error) => console.error("Error cargando cursos:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Guardar (POST o PUT según si editando)
    const handleSubmit = async () => {
    if (!form.nombre || !form.categoria) return;

    try {
        const url = editandoId !== null ? `/api/courses/${editandoId}` : "/api/courses";
        const method = editandoId !== null ? "PUT" : "POST";

        const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        });

        const curso = await response.json();

        if (!response.ok) throw new Error(curso.error || "Error desconocido");

        if (editandoId !== null) {
        // actualizar estado
        setCursos(cursos.map(c => c.curso_id === editandoId ? curso : c));
        } else {
        // agregar nuevo
        setCursos([...cursos, curso]);
        }

        setForm({});
        setEditandoId(null);
    } catch (error) {
        console.error("Error al guardar curso:", error);
    }
    };

  const iniciarEdicion = (curso: Curso) => {
    setForm(curso);
    setEditandoId(curso.curso_id);
  };

  // Eliminar curso (DELETE)
    const eliminarCurso = async (id: number) => {
    try {
        const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Error al eliminar");

        setCursos(cursos.filter((c) => c.curso_id !== id));
        setForm({});
        setEditandoId(null);
    } catch (error) {
        console.error("Error al eliminar curso:", error);
    }
    };

  const cursosFiltrados = cursos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

    return (
        <div className="p-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formulario */}
                <div className="glassmorphism p-6 rounded-3xl border border-white/30 h-[700px] flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Registro de Cursos</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="nombre" className="block text-white font-medium mb-1">Nombre del curso</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ej: Programación Avanzada"
                                    value={form.nombre || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>

                            <div>
                                <label htmlFor="categoria" className="block text-white font-medium mb-1">Categoría</label>
                                <input
                                    id="categoria"
                                    name="categoria"
                                    placeholder="Ej: Finanzas, Tecnología..."
                                    value={form.categoria || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="descripcion" className="block text-white font-medium mb-1">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    placeholder="Breve descripción del curso"
                                    value={form.descripcion || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>

                            <div>
                                <label htmlFor="fecha" className="block text-white font-medium mb-1">Fecha</label>
                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    value={form.fecha || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>

                            <div>
                                <label htmlFor="modalidad" className="block text-white font-medium mb-1">Modalidad</label>
                                <input
                                    id="modalidad"
                                    name="modalidad"
                                    placeholder="Virtual / Presencial"
                                    value={form.modalidad || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>

                            <div>
                                <label htmlFor="hora_ini" className="block text-white font-medium mb-1">Hora de inicio</label>
                                <input
                                    id="hora_ini"
                                    name="hora_ini"
                                    placeholder="Ej: 09:00"
                                    value={form.hora_ini || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>

                            <div>
                                <label htmlFor="hora_fin" className="block text-white font-medium mb-1">Hora de finalización</label>
                                <input
                                    id="hora_fin"
                                    name="hora_fin"
                                    placeholder="Ej: 12:30"
                                    value={form.hora_fin || ""}
                                    onChange={handleChange}
                                    className="input-glass"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full bg-indigo-500/30 hover:bg-indigo-500/50 text-white px-4 py-2 rounded-xl backdrop-blur-lg border border-white/20 transition-all duration-200"
                    >
                        {editandoId ? "Actualizar Curso" : "Guardar Curso"}
                    </button>
                </div>


                {/* Lista de Cursos */}
                <div className="glassmorphism p-4 rounded-2xl border border-white/30 h-[700px] flex flex-col overflow-visible">
                    <h3 className="text-lg font-semibold mb-4">Cursos registrados</h3>

                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="input-glass w-full mb-4"
                    />
                    {cursosFiltrados.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-visible pb-2">
                            {cursosFiltrados.map((c) => (
                                <li
                                    key={c.curso_id}
                                    className="p-4 rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-purple-500/30 shadow-lg transition-all duration-200 hover:scale-[1.04] transform-gpu will-change-transform"
                                >
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-bold">Nombre:</span> {c.nombre}</p>
                                        <p><span className="font-bold">Categoría:</span> {c.categoria}</p>
                                        <p><span className="font-bold">Fecha:</span> {c.fecha}</p>
                                        <p><span className="font-bold">Hora:</span> {c.hora_ini} - {c.hora_fin}</p>
                                        <p><span className="font-bold">Modalidad:</span> {c.modalidad}</p>
                                        <p><span className="font-bold">Descripción:</span> {c.descripcion}</p>
                                    </div>
                                    <div className="flex justify-end mt-2 gap-2">
                                        <button onClick={() => iniciarEdicion(c)} className="hover:text-indigo-500">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => eliminarCurso(c.curso_id)} className="hover:text-red-400">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="italic text-sm">No hay cursos registrados.</p>
                    )}

                </div>
            </div>
        </div>



    );
}
