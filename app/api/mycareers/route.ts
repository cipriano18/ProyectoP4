import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { usuario_id } = await req.json();

    if (!usuario_id) {
      return NextResponse.json(
        { error: 'ID de usuario no proporcionado' },
        { status: 400 }
      );
    }

    const graduado = await prisma.gra_graduados.findFirst({
      where: {
        usuario_id: Number(usuario_id),
      },
      select: {
        graduado_id: true,
        gra_graduadoxcarrera: {
          select: {
            gra_carreras: {
              select: {
                carrera_id: true,
                nombre: true,
                area: true,
              },
            },
          },
        },
      },
    });

    if (!graduado) {
      return NextResponse.json(
        { error: 'Graduado no encontrado para este usuario' },
        { status: 404 }
      );
    }

    const carreras = graduado.gra_graduadoxcarrera.map((relacion) => relacion.gra_carreras);

    return NextResponse.json(carreras);
  } catch (error) {
    console.error('Error en POST /api/user/careers:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
