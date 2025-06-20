
import React from "react";

interface Props {
    form: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function FormularioUsuario({ form, onChange }: Props) {
    return (
        <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Datos de Usuario</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="nombre_usuario" className="block text-white text-sm mb-1">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="nombre_usuario"
                        name="nombre_usuario"
                        value={form.nombre_usuario || ""}
                        onChange={onChange}
                        className="input-glass w-full"
                    />
                </div>

                <div>
                    <label htmlFor="contraseña" className="block text-white text-sm mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="contraseña"
                        name="contraseña"
                        value={form.contraseña || ""}
                        onChange={onChange}
                        className="input-glass w-full"
                    />
                </div>

                <div>
                    <label htmlFor="rol" className="block text-white text-sm mb-1">
                        Rol
                    </label>
                    <select
                        id="rol"
                        name="rol"
                        value={form.rol || ""}
                        onChange={onChange}
                        className="input-glass w-full"
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="G">Graduado</option>
                        <option value="A">Admin</option>
                    </select>
                </div>
            </div>
        </div>

    );
}
