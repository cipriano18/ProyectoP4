import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    const carreras = await prisma.gra_carreras.findMany()
    return NextResponse.json(carreras)
  } catch (error) {
    console.error('Error en GET /api/career:', error)
    return NextResponse.json({ error: 'Error al obtener las carreras' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const nuevaCarrera = await prisma.gra_carreras.create({
      data: {
        area: body.area,
        nombre: body.nombre,
      },
    })
    return NextResponse.json(nuevaCarrera)
  } catch (error) {
    console.error('Error en POST /api/career:', error)
    return NextResponse.json({ error: 'Error al crear la carrera' }, { status: 500 })
  }
}
