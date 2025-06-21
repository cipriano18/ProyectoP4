import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function PUT(
  req: NextRequest,
  context: any
) {
  try {
    const exponenteId = parseInt(context.params.id);
    const body = await req.json();
    const { persona, especialidad, cursos } = body;

    const exponente = await prisma.gra_exponentes.findUnique({
      where: { exponente_id: exponenteId },
    });

    if (!exponente) {
      return NextResponse.json({ error: "Exponente no encontrado" }, { status: 404 });
    }

    if (exponente.persona_id && persona) {
      await prisma.gra_personas.update({
        where: { persona_id: exponente.persona_id },
        data: persona,
      });
    }

    await prisma.gra_exponentes.update({
      where: { exponente_id: exponenteId },
      data: { especialidad },
    });

    await prisma.gra_exponentexcurso.deleteMany({
      where: { exponente_id: exponenteId },
    });

    if (Array.isArray(cursos)) {
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
    return NextResponse.json({ error: "Error al actualizar exponente" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: any
) {
  try {
    const exponenteId = parseInt(context.params.id);

    const exponente = await prisma.gra_exponentes.findUnique({
      where: { exponente_id: exponenteId },
    });

    if (!exponente) {
      return NextResponse.json({ error: "Exponente no encontrado" }, { status: 404 });
    }

    await prisma.gra_exponentexcurso.deleteMany({
      where: { exponente_id: exponenteId },
    });

    await prisma.gra_exponentes.delete({
      where: { exponente_id: exponenteId },
    });

    if (exponente.persona_id) {
      await prisma.gra_personas.delete({
        where: { persona_id: exponente.persona_id },
      });
    }

    return NextResponse.json({ mensaje: "Exponente eliminado exitosamente" });
  } catch (error) {
    console.error("Error en DELETE /api/exhibitors/[id]:", error);
    return NextResponse.json({ error: "Error al eliminar exponente" }, { status: 500 });
  }
}