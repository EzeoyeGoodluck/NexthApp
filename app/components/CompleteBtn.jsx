'use client';
// Import necessary React components and hooks
import { BsCheckCircle } from "react-icons/bs";
import { BsCircle } from "react-icons/bs"; 
import { useRouter } from "next/navigation"; 

// Define a functional component named "CompleteBtn" that represents a completion button
const CompleteBtn = ({ id, done }) => {
  // Access the router object for handling navigation
  const router = useRouter();

  // Define a function to handle topic completion
  const handleComplete = async (id) => {
    try {
      // Send a PUT request to mark the topic as completed
      const res = await fetch(`http://localhost:3000/api/updated/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      });

      // Check if the response is successful (OK status code)
      if (res.ok) {
        // Refresh the router to update the page content
        router.refresh();
      } else {
        // Throw an error if the update failed
        throw new Error("Failed to update topic");
      }
    } catch (error) {
      // Handle and log errors, if any
      console.log(error);
    }
  };

  // Render the completion button based on the "done" prop
  return (
    <>
      <span className="cursor-pointer">
        {done ? (
          // Render the "BsCheckCircle" icon when the topic is completed
          <BsCheckCircle onClick={() => handleComplete(id)} size={25} />
        ) : (
          // Render the "BsCircle" icon when the topic is not completed
          <BsCircle size={25} onClick={() => handleComplete(id)} />
        )}
      </span>
    </>
  );
};

// Export the "CompleteBtn" component as the default export of the module
export default CompleteBtn;
