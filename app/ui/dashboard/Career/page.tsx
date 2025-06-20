"use client";

import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Carrera {
  carrera_id: number;
  nombre: string;
  area: string;
}

export default function GestorCarreras() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [form, setForm] = useState<Partial<Carrera>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [busquedaCarrera, setBusquedaCarrera] = useState("");

  useEffect(() => {
    fetch("/api/career")
      .then((res) => res.json())
      .then((data) => setCarreras(data))
      .catch((err) => console.error("Error al cargar carreras:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.area) return;

    if (editandoId !== null) {
      const res = await fetch(`/api/career/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const actualizada = await res.json();
        setCarreras(carreras.map(c => c.carrera_id === editandoId ? actualizada : c));
        setEditandoId(null);
        setForm({});
      }
    } else {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const nueva = await res.json();
        setCarreras([...carreras, nueva]);
        setForm({});
      }
    }
  };

  const iniciarEdicion = (c: Carrera) => {
    setForm(c);
    setEditandoId(c.carrera_id);
  };

  const eliminarCarrera = async (id: number) => {
    const res = await fetch(`/api/career/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCarreras(carreras.filter((c) => c.carrera_id !== id));
      if (editandoId === id) {
        setForm({});
        setEditandoId(null);
      }
    }
  };

  return (
  <div className="p-6 space-y-6 text-white">
    <div className="glassmorphism p-6 rounded-3xl border border-white/30">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Carreras</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Nombre de la carrera</label>
          <input
            name="nombre"
            value={form.nombre || ""}
            onChange={handleChange}
            placeholder="Ej: Ingeniería Informática"
            className="input-glass w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Área</label>
          <input
            name="area"
            value={form.area || ""}
            onChange={handleChange}
            placeholder="Ej: Tecnología"
            className="input-glass w-full"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="mt-6 bg-[#6c63ff]/30 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all hover:shadow-xl hover:bg-[#5a54e6]/40 w-full"
      >
        {editandoId !== null ? "Actualizar Carrera" : "Registrar Carrera"}
      </motion.button>
    </div>

    <div className="glassmorphism p-4 rounded-2xl border border-white/30">
      <h3 className="text-lg font-semibold mb-4">Carreras registradas</h3>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busquedaCarrera}
        onChange={(e) => setBusquedaCarrera(e.target.value)}
        className="input-glass w-full mb-4"
      />
      {carreras.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {carreras
            .filter((c) => c.nombre.toLowerCase().includes(busquedaCarrera.toLowerCase()))
            .map((c) => (
              <li
                key={c.carrera_id}
                className="p-4 rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-[#6c63ff]/30 via-indigo-500/20 to-purple-500/20 shadow-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{c.nombre}</p>
                  <p className="text-sm text-white/70">{c.area}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => iniciarEdicion(c)} className="hover:text-indigo-500">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => eliminarCarrera(c.carrera_id)} className="hover:text-red-400">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p className="italic text-sm">No hay carreras registradas.</p>
      )}
    </div>
  </div>
);
}
