import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// updating the todos
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const strid = params.id;
    const id = Number(strid);
    const { title, completed } = await request.json();
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        completed,
      },
    });
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (e) {
    return new NextResponse(`error while updating todo ${e}`, { status: 400 });
  }
}

// deleting todo

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const strid = params.id;
    const id = Number(strid);
    if (isNaN(id)) {
      return NextResponse.json("invailid id", { status: 403 });
    }
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json("todo deleted succesfully", { status: 200 });
  } catch (e) {
    return new NextResponse(`error deleting todo ${e}`, { status: 400 });
  }
}
