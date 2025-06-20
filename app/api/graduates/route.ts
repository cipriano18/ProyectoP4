// src/app/api/graduates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// POST: Crear nuevo graduado con persona, usuario, carreras y cursos
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      persona,     // { p_nombre, s_nombre, ... }
      usuario,     // { nombre, contrasenia, rol }
      anio_egreso,
      carreras,    // array de carrera_id
      cursos       // array de curso_id
    } = data;

    // Validaciones básicas
    if (
      !persona?.p_nombre || !persona?.p_apellido || !persona?.cedula || !persona?.correo ||
      !usuario?.nombre || !usuario?.contrasenia || !usuario?.rol ||
      !anio_egreso ||
      !Array.isArray(carreras) || carreras.length === 0 ||
      !Array.isArray(cursos) || cursos.length === 0
    ) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Verificar que las carreras existan
    const carrerasExistentes = await prisma.gra_carreras.findMany({
      where: { carrera_id: { in: carreras } },
    });
    if (carrerasExistentes.length !== carreras.length) {
      return NextResponse.json(
        { error: 'Una o más carreras no existen' },
        { status: 400 }
      );
    }

    // Verificar que los cursos existan
    const cursosExistentes = await prisma.gra_cursos.findMany({
      where: { curso_id: { in: cursos } },
    });
    if (cursosExistentes.length !== cursos.length) {
      return NextResponse.json(
        { error: 'Uno o más cursos no existen' },
        { status: 400 }
      );
    }

    // 1. Crear persona
    const nuevaPersona = await prisma.gra_personas.create({
      data: persona,
    });

    // 2. Crear usuario
    const nuevoUsuario = await prisma.gra_usuarios.create({
      data: usuario,
    });

    // 3. Crear graduado
    const nuevoGraduado = await prisma.gra_graduados.create({
      data: {
        anio_egreso,
        persona_id: nuevaPersona.persona_id,
        usuario_id: nuevoUsuario.usuario_id,
      },
    });

    // 4. Asociar carreras
    await Promise.all(
      carreras.map((carrera_id: number) =>
        prisma.gra_graduadoxcarrera.create({
          data: {
            graduado_id: nuevoGraduado.graduado_id,
            carrera_id,
          },
        })
      )
    );

    // 5. Asociar cursos
    await Promise.all(
      cursos.map((curso_id: number) =>
        prisma.gra_graduadoxcurso.create({
          data: {
            graduado_id: nuevoGraduado.graduado_id,
            curso_id,
          },
        })
      )
    );

    return NextResponse.json({ message: 'Graduado registrado correctamente' });
  } catch (error) {
    console.error('Error al crear graduado:', error);
    return NextResponse.json(
      { error: 'Error interno al crear graduado' },
      { status: 500 }
    );
  }
}

// GET: Obtener todos los graduados con persona, usuario, carreras y cursos
export async function GET() {
  try {
    const graduados = await prisma.gra_graduados.findMany({
      include: {
        gra_personas: true,
        gra_usuarios: true,
        gra_graduadoxcarrera: {
          include: {
            gra_carreras: true,
          },
        },
        gra_graduadoxcurso: {
          include: {
            gra_cursos: true,
          },
        },
      },
    });

    return NextResponse.json(graduados);
  } catch (error) {
    console.error('Error al obtener graduados:', error);
    return NextResponse.json(
      { error: 'Error interno al obtener graduados' },
      { status: 500 }
    );
  }
}
