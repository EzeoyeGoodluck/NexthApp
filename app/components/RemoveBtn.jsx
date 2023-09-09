'use client';

// Import statements for necessary libraries and components
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js
import { FiTrash2 } from "react-icons/fi"; // Importing the FiTrash2 icon from react-icons/fi

// Define the RemoveBtn component
const RemoveBtn = ({ id }) => {
    // Initialize the router using the useRouter hook
    const router = useRouter()

    // Define a function to remove the topic
    const removeTopic = async () => {
        // Ask for confirmation before proceeding
        const confirmed = confirm('Are you sure?')

        if (confirmed) {
            // Send a DELETE request to the specified API endpoint
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method: "DELETE",
            });

            // If the DELETE request is successful (HTTP status code 200), refresh the router
            if (res.ok) {
                router.refresh();
            }
        }
    }

    // Return JSX that renders a button containing the FiTrash2 icon
    return (
        <button>
            <FiTrash2
                onClick={removeTopic} // Attach the removeTopic function to the onClick event of the icon
                size={25} // Set the size of the icon
                className="text-red-500 cursor-pointer" // Apply CSS classes for styling
            />
        </button>
    )
}

// Export the RemoveBtn component
export default RemoveBtn;