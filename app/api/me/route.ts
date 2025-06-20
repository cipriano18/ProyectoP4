import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { usuario_id } = await req.json();

    if (!usuario_id) {
      return NextResponse.json({ error: 'usuario_id requerido' }, { status: 400 });
    }

    const graduado = await prisma.gra_graduados.findFirst({
      where: { usuario_id: Number(usuario_id) },
      include: {
        gra_personas: true,
        gra_usuarios: true,
      },
    });

    if (!graduado || !graduado.gra_personas) {
      return NextResponse.json({ error: 'Graduado o persona no encontrado' }, { status: 404 });
    }

    const persona = graduado.gra_personas;

    return NextResponse.json({
      id: graduado.graduado_id,
      p_nombre: persona.p_nombre,
      s_nombre: persona.s_nombre,
      p_apellido: persona.p_apellido,
      s_apellido: persona.s_apellido,
      ced_expo: persona.cedula,
      correo_elect: persona.correo,
      tel_personal: persona.tel_personal,
      tel_trabajo: persona.tel_trabajo,
      direc: persona.direc,
      año_egreso: graduado.anio_egreso,
      nombre_usuario: graduado.gra_usuarios?.nombre,
    });
  } catch (error) {
    console.error('Error en POST /api/me:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { usuario_id, correo_elect, tel_personal, tel_trabajo, direc } = await req.json();

    if (!usuario_id) {
      return NextResponse.json({ error: 'usuario_id requerido' }, { status: 400 });
    }

    const graduado = await prisma.gra_graduados.findFirst({
      where: { usuario_id: Number(usuario_id) },
    });

    if (!graduado || !graduado.persona_id) {
      return NextResponse.json({ error: 'Graduado o persona no encontrado' }, { status: 404 });
    }

    const updated = await prisma.gra_personas.update({
      where: { persona_id: graduado.persona_id }, 
      data: {
        correo: correo_elect,
        tel_personal,
        tel_trabajo,
        direc,
      },
    });

    return NextResponse.json({ message: 'Datos actualizados correctamente', updated });
  } catch (error) {
    console.error('Error en PUT /api/me:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
