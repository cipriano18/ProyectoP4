"use client";

import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import FormularioPersona from "../../dashboard/FormularioPersona";
import FormularioUsuario from "../../dashboard/FormularioUsuario";

interface Graduado {
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
  año_egreso: string;
  carrerasSeleccionadas: number[];
  cursosSeleccionados: number[];
  nombre_usuario?: string;
  contraseña?: string;
  rol?: string;
}

interface Carrera {
  carrera_id: number;
  nombre: string;
  area: string;
}

interface Curso {
  curso_id: number;
  nombre: string;
}

export default function GraduadosPage() {
  const [graduados, setGraduados] = useState<Graduado[]>([]);
  const [form, setForm] = useState<Partial<Graduado>>({ cursosSeleccionados: [], carrerasSeleccionadas: [] });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [busquedaCedula, setBusquedaCedula] = useState("");
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const cargarCarreras = async () => {
      const res = await fetch("/api/career");
      const data = await res.json();
      setCarreras(data);
    };

    const cargarCursos = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCursos(data);
    };

    const cargarGraduados = async () => {
      const res = await fetch("/api/graduates");
      const data = await res.json();
      const adaptados = data.map((g: any) => ({
        id: g.graduado_id,
        p_nombre: g.gra_personas?.p_nombre || '',
        s_nombre: g.gra_personas?.s_nombre || '',
        p_apellido: g.gra_personas?.p_apellido || '',
        s_apellido: g.gra_personas?.s_apellido || '',
        ced_expo: g.gra_personas?.cedula || '',
        correo_elect: g.gra_personas?.correo || '',
        tel_personal: g.gra_personas?.tel_personal || '',
        tel_trabajo: g.gra_personas?.tel_trabajo || '',
        direc: g.gra_personas?.direc || '',
        año_egreso: g.anio_egreso || '',
        carrerasSeleccionadas: g.gra_graduadoxcarrera?.map((c: any) => c.carrera_id) || [],
        cursosSeleccionados: g.gra_graduadoxcurso?.map((c: any) => c.curso_id) || [],
        nombre_usuario: g.gra_usuarios?.nombre || '',
        contraseña: g.gra_usuarios?.contrasenia || '',
        rol: g.gra_usuarios?.rol || '',
      }));
      setGraduados(adaptados);
    };

    cargarCarreras();
    cargarCursos();
    cargarGraduados();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  if (!form.p_nombre || !form.p_apellido || !form.ced_expo || !form.correo_elect || !form.año_egreso || !form.nombre_usuario || !form.contraseña || !form.rol) {
    alert("Por favor complete todos los campos requeridos, incluyendo usuario.");
    return;
  }

  const method = editandoId ? "PUT" : "POST";
  const url = editandoId ? `/api/graduates/${editandoId}` : "/api/graduates";

  const body = editandoId
    ? {
        p_nombre: form.p_nombre,
        s_nombre: form.s_nombre,
        p_apellido: form.p_apellido,
        s_apellido: form.s_apellido,
        ced_expo: form.ced_expo,
        correo_elect: form.correo_elect,
        tel_personal: form.tel_personal,
        tel_trabajo: form.tel_trabajo,
        direc: form.direc,
        anio_egreso: form.año_egreso,
        nombre_usuario: form.nombre_usuario,
        contrasenia: form.contraseña,
        rol: form.rol === "Graduado" ? "G" : form.rol === "Admin" ? "A" : form.rol,
        carrerasSeleccionadas: form.carrerasSeleccionadas,
        cursosSeleccionados: form.cursosSeleccionados,
      }
    : {
        persona: {
          p_nombre: form.p_nombre,
          s_nombre: form.s_nombre,
          p_apellido: form.p_apellido,
          s_apellido: form.s_apellido,
          cedula: form.ced_expo,
          correo: form.correo_elect,
          tel_personal: form.tel_personal,
          tel_trabajo: form.tel_trabajo,
          direc: form.direc,
        },
        usuario: {
          nombre: form.nombre_usuario,
          contrasenia: form.contraseña,
           rol: form.rol === "Graduado" ? "G" : form.rol === "Admin" ? "A" : form.rol,
        },
        anio_egreso: form.año_egreso,
        carreras: form.carrerasSeleccionadas,
        cursos: form.cursosSeleccionados,
      };

  try {
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    window.location.reload();
  } catch (error) {
    console.error("Error al guardar/actualizar graduado:", error);
  }
};

  const eliminarGraduado = async (id: number) => {
    try {
      await fetch(`/api/graduates/${id}`, { method: "DELETE" });
      setGraduados(prev => prev.filter(g => g.id !== id));
    } catch (error) {
      console.error("Error al eliminar graduado:", error);
    }
  };

  const iniciarEdicion = (graduado: Graduado) => {
    setForm(graduado);
    setEditandoId(graduado.id);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glassmorphism p-6 rounded-3xl border border-white/30">
          <h1 className="text-3xl font-bold mb-6 text-white">Registro de Graduados</h1>
          <FormularioPersona form={form} onChange={handleChange} />
          <div className="mt-6 max-w-xs space-y-4">
            <label htmlFor="año_egreso" className="block text-white font-medium mb-1">Año de egreso</label>
            <input
              id="año_egreso"
              name="año_egreso"
              type="text"
              placeholder="Ej: 2020"
              value={form.año_egreso || ""}
              onChange={handleChange}
              className="input-glass"
            />
            <div>
              <p className="text-white font-medium mb-2">Carreras</p>
              {carreras.map((c) => (
                <label key={c.carrera_id} className="inline-flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    value={c.carrera_id}
                    checked={form.carrerasSeleccionadas?.includes(c.carrera_id) || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setForm((prev) => {
                        const actuales = prev.carrerasSeleccionadas || [];
                        return checked ? { ...prev, carrerasSeleccionadas: [...actuales, c.carrera_id] } : { ...prev, carrerasSeleccionadas: actuales.filter((id) => id !== c.carrera_id) };
                      });
                    }}
                    className="form-checkbox text-indigo-500"
                  />
                  <span className="ml-2 text-white">{c.nombre}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-white font-medium mb-2">Cursos</p>
              {cursos.map((c) => (
                <label key={c.curso_id} className="inline-flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    value={c.curso_id}
                    checked={form.cursosSeleccionados?.includes(c.curso_id) || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setForm((prev) => {
                        const actuales = prev.cursosSeleccionados || [];
                        return checked ? { ...prev, cursosSeleccionados: [...actuales, c.curso_id] } : { ...prev, cursosSeleccionados: actuales.filter((id) => id !== c.curso_id) };
                      });
                    }}
                    className="form-checkbox text-indigo-500"
                  />
                  <span className="ml-2 text-white">{c.nombre}</span>
                </label>
              ))}
            </div>
          </div>
          <FormularioUsuario form={form} onChange={handleChange} />
          <button onClick={handleSubmit} className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition">
            {editandoId !== null ? "Actualizar Graduado" : "Guardar Graduado"}
          </button>
        </div>

        <div className="glassmorphism p-4 rounded-2xl border border-white/30 text-white max-h-[1200px] max-w-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Graduados Registrados</h2>
          <input
            type="text"
            placeholder="Buscar por cédula"
            value={busquedaCedula}
            onChange={(e) => setBusquedaCedula(e.target.value)}
            className="input-glass mb-4 w-full"
          />
          {graduados.length === 0 ? (
            <p className="italic text-sm">No hay graduados registrados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {graduados.filter((g) => g.ced_expo.toLowerCase().includes(busquedaCedula.toLowerCase())).map((g) => (
                <div key={g.id} className="p-4 rounded-2xl border border-white/20 bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-purple-500/30 shadow-lg">
                  <p><strong>Nombre:</strong> {`${g.p_nombre} ${g.s_nombre} ${g.p_apellido} ${g.s_apellido}`}</p>
                  <p><strong>Cédula:</strong> {g.ced_expo}</p>
                  <p><strong>Correo:</strong> {g.correo_elect}</p>
                  <p><strong>Año de egreso:</strong> {g.año_egreso}</p>
                  <p><strong>Carreras:</strong> {carreras.filter((c) => g.carrerasSeleccionadas.includes(c.carrera_id)).map((c) => c.nombre).join(", ") || "Ninguna"}</p>
                  <p><strong>Cursos:</strong> {cursos.filter((c) => g.cursosSeleccionados.includes(c.curso_id)).map((c) => c.nombre).join(", ") || "Ninguno"}</p>
                  <div className="flex justify-end gap-4 mt-4">
                    <button onClick={() => iniciarEdicion(g)} className="hover:text-indigo-400"><PencilIcon className="h-6 w-6" /></button>
                    <button onClick={() => eliminarGraduado(g.id)} className="hover:text-red-500"><TrashIcon className="h-6 w-6" /></button>
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
