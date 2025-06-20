import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuario y contraseña requeridos' }, { status: 400 })
    }

    const usuario = await prisma.gra_usuarios.findFirst({
      where: {
        nombre: username,
        contrasenia: password,
      },
    })

    if (!usuario) {
      return NextResponse.json({ success: false, error: 'Credenciales inválidas' }, { status: 401 })
    }

    return NextResponse.json({ success: true, rol: usuario.rol }, { status: 200 })
  } catch (error) {
    console.error('Error en POST /api/login:', error)
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
