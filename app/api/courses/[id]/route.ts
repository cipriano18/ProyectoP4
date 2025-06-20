// src/app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const cursoActualizado = await prisma.gra_cursos.update({
      where: { curso_id: id },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: body.fecha ? new Date(body.fecha) : undefined,
        hora_ini: body.hora_ini,
        hora_fin: body.hora_fin,
        modalidad: body.modalidad,
        categoria: body.categoria,
      },
    });
    return NextResponse.json(cursoActualizado);
  } catch (error) {
    console.error('Error en PUT /api/courses/[id]:', error);
    return NextResponse.json({ error: 'Error al actualizar curso' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    await prisma.gra_cursos.delete({
      where: { curso_id: id },
    });
    return NextResponse.json({ mensaje: 'Curso eliminado' });
  } catch (error) {
    console.error('Error en DELETE /api/courses/[id]:', error);
    return NextResponse.json({ error: 'Error al eliminar curso' }, { status: 500 });
  }
}
