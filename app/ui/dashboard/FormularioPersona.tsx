import React from "react";

interface PersonaForm {
  p_nombre?: string;
  s_nombre?: string;
  p_apellido?: string;
  s_apellido?: string;
  ced_expo?: string;
  correo_elect?: string;
  tel_personal?: string;
  tel_trabajo?: string;
  direc?: string;
}

interface Props {
  form: PersonaForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormularioPersona({ form, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="text-white font-medium">Primer nombre *</label>
        <input
          name="p_nombre"
          value={form.p_nombre || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Primer nombre"
        />
      </div>

      <div>
        <label className="text-white font-medium">Segundo nombre</label>
        <input
          name="s_nombre"
          value={form.s_nombre || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Segundo nombre"
        />
      </div>

      <div>
        <label className="text-white font-medium">Primer apellido *</label>
        <input
          name="p_apellido"
          value={form.p_apellido || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Primer apellido"
        />
      </div>

      <div>
        <label className="text-white font-medium">Segundo apellido *</label>
        <input
          name="s_apellido"
          value={form.s_apellido || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Segundo apellido"
        />
      </div>

      <div>
        <label className="text-white font-medium">Cédula *</label>
        <input
          name="ced_expo"
          value={form.ced_expo || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Identificación"
        />
      </div>

      <div>
        <label className="text-white font-medium">Correo electrónico *</label>
        <input
          name="correo_elect"
          value={form.correo_elect || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Correo"
        />
      </div>

      <div>
        <label className="text-white font-medium">Teléfono personal *</label>
        <input
          name="tel_personal"
          value={form.tel_personal || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Tel. personal"
        />
      </div>

      <div>
        <label className="text-white font-medium">Teléfono de trabajo</label>
        <input
          name="tel_trabajo"
          value={form.tel_trabajo || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Tel. trabajo"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="text-white font-medium">Dirección *</label>
        <input
          name="direc"
          value={form.direc || ""}
          onChange={onChange}
          className="input-glass"
          placeholder="Dirección completa"
        />
      </div>
    </div>
  );
}
