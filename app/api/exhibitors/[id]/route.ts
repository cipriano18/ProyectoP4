// app/api/exhibitors/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exponenteId = parseInt(params.id);
    const body = await req.json();

    const {
      persona,
      especialidad,
      cursos, // array de curso_id
    } = body;

    // Buscar exponente existente
    const exponente = await prisma.gra_exponentes.findUnique({
      where: { exponente_id: exponenteId },
    });

    if (!exponente)
      return NextResponse.json(
        { error: "Exponente no encontrado" },
        { status: 404 }
      );

    // Actualizar persona asociada
    if (exponente.persona_id && persona) {
      await prisma.gra_personas.update({
        where: { persona_id: exponente.persona_id },
        data: {
          p_nombre: persona.p_nombre,
          s_nombre: persona.s_nombre,
          p_apellido: persona.p_apellido,
          s_apellido: persona.s_apellido,
          cedula: persona.cedula,
          correo: persona.correo,
          tel_personal: persona.tel_personal,
          tel_trabajo: persona.tel_trabajo,
          direc: persona.direc,
        },
      });
    }

    // Actualizar exponente (especialidad)
    await prisma.gra_exponentes.update({
      where: { exponente_id: exponenteId },
      data: { especialidad },
    });

    // Borrar asociaciones antiguas de cursos
    await prisma.gra_exponentexcurso.deleteMany({
      where: { exponente_id: exponenteId },
    });

    // Crear asociaciones nuevas de cursos
    if (Array.isArray(cursos) && cursos.length > 0) {
      await prisma.gra_exponentexcurso.createMany({
        data: cursos.map((curso_id: number) => ({
          curso_id,
          exponente_id: exponenteId,
        })),
      });
    }

    return NextResponse.json({ mensaje: "Exponente actualizado exitosamente" });
  } catch (error) {
    console.error("Error en PUT /api/exhibitors/[id]:", error);
    return NextResponse.json(
      { error: "Error al actualizar exponente" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exponenteId = parseInt(params.id);

    // Buscar exponente existente
    const exponente = await prisma.gra_exponentes.findUnique({
      where: { exponente_id: exponenteId },
    });

    if (!exponente)
      return NextResponse.json(
        { error: "Exponente no encontrado" },
        { status: 404 }
      );

    // Borrar asociaciones de cursos
    await prisma.gra_exponentexcurso.deleteMany({
      where: { exponente_id: exponenteId },
    });

    // Borrar exponente
    await prisma.gra_exponentes.delete({
      where: { exponente_id: exponenteId },
    });

    // Borrar persona asociada (opcional: solo si no está asociada a otros registros)
    if (exponente.persona_id) {
      await prisma.gra_personas.delete({
        where: { persona_id: exponente.persona_id },
      });
    }

    return NextResponse.json({ mensaje: "Exponente eliminado exitosamente" });
  } catch (error) {
    console.error("Error en DELETE /api/exhibitors/[id]:", error);
    return NextResponse.json(
      { error: "Error al eliminar exponente" },
      { status: 500 }
    );
  }
}
