// src/app/api/exhibitors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// POST: Crear nuevo exponente con persona y cursos
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      persona,     // { p_nombre, s_nombre, ... }
      especialidad,
      cursos       // array de curso_id
    } = data;

    if (!persona?.p_nombre || !persona?.p_apellido || !persona?.cedula || !persona?.correo || !especialidad || !Array.isArray(cursos) || cursos.length === 0) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Verificar que los cursos existan
    const cursosExistentes = await prisma.gra_cursos.findMany({
      where: { curso_id: { in: cursos } },
    });
    if (cursosExistentes.length !== cursos.length) {
      return NextResponse.json({ error: 'Uno o más cursos no existen' }, { status: 400 });
    }

    // 1. Crear persona
    const nuevaPersona = await prisma.gra_personas.create({
      data: persona,
    });

    // 2. Crear exponente
    const nuevoExponente = await prisma.gra_exponentes.create({
      data: {
        especialidad,
        persona_id: nuevaPersona.persona_id,
      },
    });

    // 3. Asociar cursos
    await Promise.all(
      cursos.map((curso_id: number) =>
        prisma.gra_exponentexcurso.create({
          data: {
            curso_id,
            exponente_id: nuevoExponente.exponente_id,
          },
        })
      )
    );

    return NextResponse.json({ message: 'Exponente registrado correctamente' });
  } catch (error) {
    console.error('Error al crear exponente:', error);
    return NextResponse.json({ error: 'Error interno al crear exponente' }, { status: 500 });
  }
}

// GET: Obtener todos los exponentes con persona y cursos
export async function GET() {
  try {
    const exponentes = await prisma.gra_exponentes.findMany({
      include: {
        gra_personas: true,
        gra_exponentexcurso: {
          include: {
            gra_cursos: true
          }
        }
      }
    });

    return NextResponse.json(exponentes);
  } catch (error) {
    console.error('Error al obtener exponentes:', error);
    return NextResponse.json({ error: 'Error interno al obtener exponentes' }, { status: 500 });
  }
}
