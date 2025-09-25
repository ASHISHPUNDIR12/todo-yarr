import { auth } from "@/auth";
import AddTodoForm from "@/components/AddTodoForm";
import AuthButtons from "@/components/AuthButtons";
import TodoItem from "@/components/TodoItem";
import prisma from "@/lib/prisma";

async function getTodos(id: string) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: id,
    },
  });
  return todos;
}
export default async function Home() {
  const session = await auth();

  const todos = session?.user?.id ? await getTodos(session.user.id) : [];
  console.log(todos);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-8">
        <AuthButtons />
      </div>
      <h1 className="text-4xl font-bold mb-8">Todo App</h1>
      <AddTodoForm />

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
