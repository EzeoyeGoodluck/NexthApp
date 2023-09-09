"use client";

// Import necessary modules and dependencies
import { useState } from "react"; // Import the "useState" hook from React for managing component state
import { useRouter } from "next/navigation"; // Import the "useRouter" hook from Next.js for routing

// Define a functional component named "EditTopicForm"
export default function EditTopicForm({ id, title, description }) {
  // Define state variables for the new title and description
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Access the router object for handling navigation
  const router = useRouter();

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a PUT request to update the topic with the provided ID
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      // Check if the response is not OK (e.g., if the update failed)
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      // Refresh the router to update the page content
      router.refresh();

      // Navigate to the "/dashboard" route
      router.push("/dashboard");
    } catch (error) {
      // Handle and log errors, if any
      console.log(error);
    }
  };

  // Render the edit topic form
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Input field for the new topic title */}
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Topic Title"
          />

          {/* Input field for the new topic description */}
          <input
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Topic Description"
          />

          {/* Submit button for updating the topic */}
          <button
            type="submit"
            className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
          >
            Update Topic
          </button>
        </form>
      </div>
    </div>
  );
}
