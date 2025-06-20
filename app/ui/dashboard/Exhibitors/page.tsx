"use client";

import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import FormularioPersona from "../../dashboard/FormularioPersona";

interface Expositor {
  id: number;
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido?: string;
  ced_expo: string;
  correo_elect: string;
  tel_personal?: string;
  tel_trabajo?: string;
  direc?: string;
  especialidad: string;
  cursosSeleccionados: number[];
}

interface Curso {
  curso_id: number;
  nombre: string;
}

export default function ExpositoresPage() {
  const [expositores, setExpositores] = useState<Expositor[]>([]);
  const [form, setForm] = useState<Partial<Expositor>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [busquedaCedula, setBusquedaCedula] = useState("");
  const [cursos, setCursos] = useState<Curso[]>([]);

  const cargarExpositores = async () => {
    try {
      const res = await fetch("/api/exhibitors");
      const data = await res.json();

      const adaptados = data.map((ex: any) => ({
        id: ex.exponente_id,
        p_nombre: ex.gra_personas?.p_nombre || "",
        s_nombre: ex.gra_personas?.s_nombre || "",
        p_apellido: ex.gra_personas?.p_apellido || "",
        s_apellido: ex.gra_personas?.s_apellido || "",
        ced_expo: ex.gra_personas?.cedula || "",
        correo_elect: ex.gra_personas?.correo || "",
        tel_personal: ex.gra_personas?.tel_personal || "",
        tel_trabajo: ex.gra_personas?.tel_trabajo || "",
        direc: ex.gra_personas?.direc || "",
        especialidad: ex.especialidad || "",
        cursosSeleccionados:
          ex.gra_exponentexcurso?.map((cx: any) => cx.curso_id) || [],
      }));

      setExpositores(adaptados);
    } catch (error) {
      console.error("Error al cargar expositores:", error);
    }
  };

  const cargarCursos = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  useEffect(() => {
    cargarExpositores();
    cargarCursos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "cursosSeleccionados") {
      const cursoId = Number(value);
      setForm((prev) => {
        const actuales = prev.cursosSeleccionados || [];
        if ((e.target as HTMLInputElement).checked) {
          if (!actuales.includes(cursoId)) {
            return { ...prev, cursosSeleccionados: [...actuales, cursoId] };
          }
        } else {
          return {
            ...prev,
            cursosSeleccionados: actuales.filter((id) => id !== cursoId),
          };
        }
        return prev;
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (
      !form.p_nombre ||
      !form.p_apellido ||
      !form.ced_expo ||
      !form.correo_elect ||
      !form.direc ||
      !form.especialidad
    ) {
      alert("Por favor complete todos los campos requeridos.");
      return;
    }

    const nuevoExpositor = {
      persona: {
        p_nombre: form.p_nombre,
        s_nombre: form.s_nombre || "",
        p_apellido: form.p_apellido,
        s_apellido: form.s_apellido || "",
        cedula: form.ced_expo,
        correo: form.correo_elect,
        tel_personal: form.tel_personal || "",
        tel_trabajo: form.tel_trabajo || "",
        direc: form.direc || "",
      },
      especialidad: form.especialidad,
      cursos: form.cursosSeleccionados || [],
    };

    console.log("Enviando expositor:", nuevoExpositor);

    try {
      const res = await fetch(
        editandoId !== null ? `/api/exhibitors/${editandoId}` : "/api/exhibitors",
        {
          method: editandoId !== null ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoExpositor),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error desconocido al guardar");
      }

      alert(
        editandoId !== null
          ? "Expositor actualizado correctamente"
          : "Expositor registrado correctamente"
      );

      await cargarExpositores();
      setForm({});
      setEditandoId(null);
    } catch (error) {
      console.error("Error al guardar expositor:", error);
      alert("No se pudo guardar el expositor.");
    }
  };

  const iniciarEdicion = (expositor: Expositor) => {
    setForm({
      ...expositor,
      cursosSeleccionados: expositor.cursosSeleccionados || [],
    });
    setEditandoId(expositor.id);
  };

  const eliminarExpositor = async (id: number) => {
    const confirmar = window.confirm("¿Está seguro de que desea eliminar este expositor?");
    if (!confirmar) return;

    try {
      const res = await fetch(`/api/exhibitors/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error desconocido al eliminar");
      }

      alert("Expositor eliminado correctamente");
      await cargarExpositores();
      if (editandoId === id) {
        setEditandoId(null);
        setForm({});
      }
    } catch (error) {
      console.error("Error al eliminar expositor:", error);
      alert("No se pudo eliminar el expositor.");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario */}
        <div className="glassmorphism p-6 rounded-3xl border border-white/30">
          <h1 className="text-3xl font-bold mb-6 text-white">Registro de Expositores</h1>
          <FormularioPersona form={form} onChange={handleChange} />

          <div className="mt-6 max-w-xs space-y-4">
            <label htmlFor="especialidad" className="block text-white font-medium mb-1">
              Especialidad
            </label>
            <input
              id="especialidad"
              name="especialidad"
              type="text"
              placeholder="Ej: Salud Mental"
              value={form.especialidad || ""}
              onChange={handleChange}
              className="input-glass"
            />

            <div>
              <p className="text-white font-medium mb-2">Cursos</p>
              {cursos.length === 0 && (
                <p className="text-sm italic text-white/70">No hay cursos disponibles.</p>
              )}

              {cursos.map((c) => (
                <label
                  key={c.curso_id}
                  className="inline-flex items-center mr-4 mb-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    name="cursosSeleccionados"
                    value={c.curso_id}
                    checked={form.cursosSeleccionados?.includes(c.curso_id) || false}
                    onChange={handleChange}
                    className="form-checkbox text-indigo-500"
                  />
                  <span className="ml-2 text-white">{c.nombre}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
          >
            {editandoId !== null ? "Actualizar Expositor" : "Guardar Expositor"}
          </button>
        </div>

        {/* Lista de expositores */}
        <div className="glassmorphism p-4 rounded-2xl border border-white/30 text-white max-h-[1000px] max-w-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Expositores Registrados</h2>

          <input
            type="text"
            placeholder="Buscar por cédula"
            value={busquedaCedula}
            onChange={(e) => setBusquedaCedula(e.target.value)}
            className="input-glass mb-4 w-full"
          />

          {expositores.length === 0 ? (
            <p className="italic text-sm">No hay expositores registrados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expositores
                .filter((ex) =>
                  (ex.ced_expo ?? "").toLowerCase().includes(busquedaCedula.toLowerCase())
                )
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="p-4 rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-purple-500/30 shadow-lg transition-all duration-200 hover:scale-[1.04] transform-gpu will-change-transform"
                  >
                    <div>
                      <p>
                        <strong>Nombre:</strong>{" "}
                        {`${ex.p_nombre} ${ex.s_nombre} ${ex.p_apellido} ${ex.s_apellido}`}
                      </p>
                      <p><strong>Cédula:</strong> {ex.ced_expo}</p>
                      <p><strong>Correo:</strong> {ex.correo_elect}</p>
                      <p><strong>Especialidad:</strong> {ex.especialidad}</p>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                      <button
                        onClick={() => iniciarEdicion(ex)}
                        className="hover:text-indigo-400"
                        aria-label="Editar expositor"
                      >
                        <PencilIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => eliminarExpositor(ex.id)}
                        className="hover:text-red-500"
                        aria-label="Eliminar expositor"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
