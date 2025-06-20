import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { usuario_id } = await req.json();

    if (!usuario_id) {
      return NextResponse.json({ error: 'Falta el ID del usuario' }, { status: 400 });
    }

    // Buscar graduado asociado al usuario
    const graduado = await prisma.gra_graduados.findFirst({
      where: { usuario_id: usuario_id },
    });

    if (!graduado) {
      return NextResponse.json({ error: 'Graduado no encontrado' }, { status: 404 });
    }

    // Buscar cursos del graduado
    const cursosInscritos = await prisma.gra_graduadoxcurso.findMany({
      where: { graduado_id: graduado.graduado_id },
      include: {
        gra_cursos: true,
      },
    });

    const cursos = cursosInscritos.map((item) => item.gra_cursos);

    return NextResponse.json(cursos);
  } catch (error) {
    console.error('Error en POST /api/mycourses:', error);
    return NextResponse.json({ error: 'Error al obtener cursos del graduado' }, { status: 500 });
  }
}
