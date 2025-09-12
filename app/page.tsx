import AddTodoForm from "@/components/AddTodoForm";
import AuthButtons from "@/components/AuthButtons";
import TodoItem from "@/components/TodoItem";
import prisma from "@/lib/prisma";

async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos;
}
export default async function Home() {
  const todos = await getTodos();
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
