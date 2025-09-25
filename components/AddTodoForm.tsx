"use client";

import { addTodo } from "@/app/actions";

const AddTodoForm = () => {  
  return (
    <div>
      <form action={addTodo} >
        <input
          name="title"
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