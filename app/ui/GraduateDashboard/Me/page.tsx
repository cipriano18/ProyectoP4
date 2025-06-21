"use client";

import { useEffect, useState } from "react";
import { UserIcon } from '@heroicons/react/24/outline';

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
    nombre_usuario?: string;
    }

    export default function MePage() {
    const [graduado, setGraduado] = useState<Graduado | null>(null);
    const [form, setForm] = useState<Partial<Graduado>>({});
    const [contraseña, setContraseña] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const usuario_id = localStorage.getItem("usuario_id");

        if (!usuario_id) {
        setMensaje("ID de usuario no encontrado.");
        return;
        }

        fetch("/api/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            setMensaje(data.error);
            return;
            }

            setGraduado(data);
            setForm({
            correo_elect: data.correo_elect,
            tel_personal: data.tel_personal,
            tel_trabajo: data.tel_trabajo,
            direc: data.direc,
            });
        })
        .catch((err) => {
            console.error("Error al obtener datos:", err);
            setMensaje("Error al obtener datos del servidor.");
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const guardarCambios = async () => {
        const usuario_id = localStorage.getItem("usuario_id");

        if (!usuario_id) {
        setMensaje("ID de usuario no encontrado.");
        return;
        }

        try {
        const res = await fetch("/api/me", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario_id, ...form }),
        });

        const result = await res.json();

        if (res.ok) {
            setMensaje("Datos actualizados correctamente.");
            setGraduado((prev) => prev ? { ...prev, ...form } as Graduado : prev);
        } else {
            setMensaje(result.error || "Error al guardar.");
        }
        } catch (error) {
        console.error("Error al guardar:", error);
        setMensaje("Error en el servidor.");
        }
    };

    const cambiarContra = async () => {
        const usuario_id = localStorage.getItem("usuario_id");

        if (!usuario_id || !contraseña) {
            setMensaje("Debe ingresar la nueva contraseña.");
            return;
        }

        try {
            const res = await fetch("/api/me/password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario_id: Number(usuario_id),
                nueva_contrasenia: contraseña,
            }),
            });

            const result = await res.json();

            if (res.ok) {
            setMensaje("Contraseña actualizada correctamente.");
            setContraseña("");
            } else {
            setMensaje(result.error || "Error al actualizar contraseña.");
            }
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            setMensaje("Error en el servidor.");
        }
    };


    if (!graduado) return <p className="text-white">Cargando...</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
            {/* Edición */}
            <div className="glassmorphism p-6 rounded-2xl border border-white/30 space-y-6">
                <h2 className="text-2xl font-bold">Editar Información</h2>

                <div className="space-y-4">
                    <label className="block">Correo electrónico
                        <input
                            name="correo_elect"
                            value={form.correo_elect || ""}
                            onChange={handleChange}
                            className="input-glass w-full"
                            type="email"
                        />
                    </label>

                    <label className="block">Tel. Personal
                        <input
                            name="tel_personal"
                            value={form.tel_personal || ""}
                            onChange={handleChange}
                            className="input-glass w-full"
                            type="text"
                        />
                    </label>

                    <label className="block">Tel. Trabajo
                        <input
                            name="tel_trabajo"
                            value={form.tel_trabajo || ""}
                            onChange={handleChange}
                            className="input-glass w-full"
                            type="text"
                        />
                    </label>

                    <label className="block">Dirección
                        <textarea
                            name="direc"
                            value={form.direc || ""}
                            onChange={handleChange}
                            className="input-glass w-full"
                        />
                    </label>

                    <button
                        onClick={guardarCambios}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
                    >Guardar Cambios</button>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Cambiar Contraseña</h3>
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        className="input-glass w-full"
                    />
                    <button
                        onClick={cambiarContra}
                        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
                    >Actualizar Contraseña</button>
                </div>

                {mensaje && <p className="mt-4 text-sm italic text-green-300">{mensaje}</p>}
            </div>

            {/* Vista completa */}
            <div className="glassmorphism p-6 rounded-2xl border border-white/30 space-y-4 flex flex-col items-center text-white">
                {/* Icono de usuario como avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <UserIcon className="w-12 h-12 text-white" />
                </div>

                {/* Datos del graduado */}
                <div className="w-full max-w-md space-y-2">
                    <h2 className="text-2xl font-bold mb-4 text-center">Mi Información</h2>
                    <p><strong>Primer Apellido:</strong> {graduado.p_apellido}</p>
                    <p><strong>Segundo Apellido:</strong> {graduado.s_apellido}</p>
                    <p><strong>Primer Nombre:</strong> {graduado.p_nombre}</p>
                    <p><strong>Segundo Nombre:</strong> {graduado.s_nombre}</p>
                    <p><strong>Cédula:</strong> {graduado.ced_expo}</p>
                    <p><strong>Correo:</strong> {graduado.correo_elect}</p>
                    <p><strong>Teléfono personal:</strong> {graduado.tel_personal}</p>
                    <p><strong>Teléfono trabajo:</strong> {graduado.tel_trabajo}</p>
                    <p><strong>Dirección:</strong> {graduado.direc}</p>
                    <p><strong>Año egreso:</strong> {graduado.año_egreso}</p>
                    <p><strong>Usuario:</strong> {graduado.nombre_usuario}</p>
                </div>
            </div>

        </div>
    );
}

