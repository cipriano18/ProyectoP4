import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const graduadoId = parseInt(params.id);
    const body = await req.json();

    const {
      p_nombre,
      s_nombre,
      p_apellido,
      s_apellido,
      ced_expo,
      correo_elect,
      tel_personal,
      tel_trabajo,
      direc,
      anio_egreso,
      nombre_usuario,
      contrasenia,
      rol,
      carrerasSeleccionadas,
      cursosSeleccionados,
    } = body;

    const graduado = await prisma.gra_graduados.findUnique({
      where: { graduado_id: graduadoId },
    });
    if (!graduado) return NextResponse.json({ error: 'Graduado no encontrado' }, { status: 404 });

    if (graduado.persona_id) {
      await prisma.gra_personas.update({
        where: { persona_id: graduado.persona_id },
        data: {
          p_nombre,
          s_nombre,
          p_apellido,
          s_apellido,
          cedula: ced_expo,
          correo: correo_elect,
          tel_personal,
          tel_trabajo,
          direc,
        },
      });
    }

    if (graduado.usuario_id) {
      await prisma.gra_usuarios.update({
        where: { usuario_id: graduado.usuario_id },
        data: {
          nombre: nombre_usuario,
          contrasenia,
          rol,
        },
      });
    }

    await prisma.gra_graduados.update({
      where: { graduado_id: graduadoId },
      data: { anio_egreso },
    });

    await prisma.gra_graduadoxcarrera.deleteMany({ where: { graduado_id: graduadoId } });
    await prisma.gra_graduadoxcarrera.createMany({
      data: carrerasSeleccionadas.map((carrera_id: number) => ({ carrera_id, graduado_id: graduadoId })),
    });

    await prisma.gra_graduadoxcurso.deleteMany({ where: { graduado_id: graduadoId } });
    await prisma.gra_graduadoxcurso.createMany({
      data: cursosSeleccionados.map((curso_id: number) => ({ curso_id, graduado_id: graduadoId })),
    });

    return NextResponse.json({ mensaje: 'Graduado actualizado exitosamente' });
  } catch (error) {
    console.error('Error en PUT /api/graduates/[id]:', error);
    return NextResponse.json({ error: 'Error al actualizar graduado' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const graduadoId = parseInt(params.id);
    const graduado = await prisma.gra_graduados.findUnique({
      where: { graduado_id: graduadoId },
    });
    if (!graduado) return NextResponse.json({ error: 'Graduado no encontrado' }, { status: 404 });

    await prisma.gra_graduadoxcarrera.deleteMany({ where: { graduado_id: graduadoId } });
    await prisma.gra_graduadoxcurso.deleteMany({ where: { graduado_id: graduadoId } });

    await prisma.gra_graduados.delete({ where: { graduado_id: graduadoId } });

    if (graduado.usuario_id) {
      await prisma.gra_usuarios.delete({ where: { usuario_id: graduado.usuario_id } });
    }
    if (graduado.persona_id) {
      await prisma.gra_personas.delete({ where: { persona_id: graduado.persona_id } });
    }

    return NextResponse.json({ mensaje: 'Graduado eliminado exitosamente' });
  } catch (error) {
    console.error('Error en DELETE /api/graduates/[id]:', error);
    return NextResponse.json({ error: 'Error al eliminar graduado' }, { status: 500 });
  }
}