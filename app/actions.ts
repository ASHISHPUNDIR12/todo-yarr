"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// add todo
export async function addTodo(  formData: FormData) {
  console.log("i added a todo ")
  const session = await auth()
  const title = formData.get("title") as string;
  if (!title.trim()) return;

   if (!session?.user?.id) {
    console.error("No authenticated user found");
    return;
  }
  // create new todo
  try {
    await prisma.todo.create({
      data: {
        title: title,
        completed: false,
        userId : session.user.id
      },
    });
    revalidatePath("/");
  } catch (err) {
    console.error("error creating todo", err);
  }
}
// delete todo
export async function deleteTodo(id: number) {
  if (!id) return;
  try {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error("error deleting todo", err);
  }
  revalidatePath("/");
}

// toggleupdate
export async function toggleUpdate(id: number, completed: boolean) {
  if (!id) return;
  try {
    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    });
  } catch (err) {
    console.error("error while updating ", err);
  }
  revalidatePath("/");
}

//title update

export async function titleUpdate(id: number, NewTitle: string) {
  if (!id) return;
  try {
    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: NewTitle,
      },
    });
  } catch (err) {
    console.log("error updating", err);
  }
  revalidatePath("/")
}