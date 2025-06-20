// src/app/api//route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// GET: Obtener todos los cursos
export async function GET() {
  try {
    const cursos = await prisma.gra_cursos.findMany();
    return NextResponse.json(cursos);
  } catch (error) {
    console.error("Error en GET /api/courses:", error);
    return NextResponse.json({ error: 'Error al obtener cursos' }, { status: 500 });
  }
}

// POST: Crear un nuevo curso
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const nuevoCurso = await prisma.gra_cursos.create({
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
    return NextResponse.json(nuevoCurso, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/courses:", error);
    return NextResponse.json({ error: 'Error al crear curso' }, { status: 500 });
  }
}
