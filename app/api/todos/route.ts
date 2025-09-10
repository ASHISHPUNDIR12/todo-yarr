import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// reading the todo
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({});
    return NextResponse.json(todos);
  } catch (error) {
    return new NextResponse("error fetching todos", { status: 500 });
  }
}
// creating the todo
export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    if(!title){
        return new NextResponse("title is required",{status:400})
    }
    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        completed: false,
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return new NextResponse("error adding new todo", { status: 500 });
  }
}
