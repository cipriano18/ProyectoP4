import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    const { usuario_id, nueva_contrasenia } = await req.json();

    if (!usuario_id || !nueva_contrasenia) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const usuario = await prisma.gra_usuarios.findUnique({
      where: { usuario_id: Number(usuario_id) },
    });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    await prisma.gra_usuarios.update({
      where: { usuario_id: Number(usuario_id) },
      data: { contrasenia: nueva_contrasenia },
    });

    return NextResponse.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
