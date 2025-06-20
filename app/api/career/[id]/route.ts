import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split('/').pop())

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const carreraActualizada = await prisma.gra_carreras.update({
      where: { carrera_id: id },
      data: {
        area: body.area,
        nombre: body.nombre,
      },
    })
    return NextResponse.json(carreraActualizada)
  } catch (error) {
    console.error('Error en PUT /api/career/[id]:', error)
    return NextResponse.json({ error: 'Error al actualizar la carrera' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split('/').pop())

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
  }

  try {
    await prisma.gra_carreras.delete({
      where: { carrera_id: id },
    })
    return NextResponse.json({ mensaje: 'Carrera eliminada' })
  } catch (error) {
    console.error('Error en DELETE /api/career/[id]:', error)
    return NextResponse.json({ error: 'Error al eliminar carrera' }, { status: 500 })
  }
}
