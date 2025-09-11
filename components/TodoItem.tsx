"use client";

import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
type TodoItemProps = {
  todo: Todo;
};
const TodoItem = ({ todo }: TodoItemProps) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  // deleting todo
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("error while deleting a todo");
      }
      router.refresh();
    } catch (error) {
      console.error("error deleting a todo", error);
    }
  };
  // Updating checkbox todo
  const handleToggleComplete = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!res.ok) {
        throw new Error("error updating todo");
      }
      router.refresh();
    } catch (error) {
      console.error("error updating todo", error);
    }
  };
  // updating todo title
  const handleUpdate = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });
      if (!res.ok) {
        throw new Error("error updating title");
      }
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      console.error("error updating title", error);
    }
  };
  return (
    <div>
      <li className="flex items-center justify-between p-2 border-b">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5"
        />{" "}
        {isEditing ? (
          // EDITING VIEW
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 p-1 border rounded"
          />
        ) : (
          // DEFAULT VIEW
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
        <div>
          {isEditing ? (
            <button className="" onClick={handleUpdate}>
              save
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            delete
          </button>
        </div>
      </li>
    </div>
  );
};
export default TodoItem;
