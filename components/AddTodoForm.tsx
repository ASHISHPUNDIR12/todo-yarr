"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddTodoForm = () => {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await fetch("/api/todos", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("failed to create new todo");
      }
      setTitle("");
      router.refresh();
    } catch (error) {
      console.error("error creating a todo", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          placeholder="What needs to be done"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add{" "}
        </button>
      </form>
    </div>
  );
};
export default AddTodoForm;
