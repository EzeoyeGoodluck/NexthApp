'use client';

// Import necessary modules and components
import { useState } from "react";
import Modal from '../components/modal';
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";

// Define the AddTask component
const AddTask = () => {
    // Define state variables for managing modal visibility and form input values
    const [modalOpen, setModalOpen] = useState(false);
    const [newTaskValue, setNewTaskvalue] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    // Initialize the Next.js router
    const router = useRouter();

    // Handle form submission when adding a new task
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if both title and description are provided
        if (!title || !description) {
            alert('Title and description are required.');
            return;
        }

        try {
            // Send a POST request to create a new topic using fetch
            const res = await fetch('http://localhost:3000/api/topics', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            if (res.ok) {
                // setModal open to false
                 setModalOpen(false)
                 router.refresh();
            } else {
                throw new Error('Failed to create a topic.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/* Button to open the modal */}
            <button onClick={() => setModalOpen(true)} className="btn  bg-green-400 text-bold">
                ADD TODO <AiOutlinePlus size={18} />
            </button>

            {/* Modal for adding a new task */}
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit}>
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <div className="modal-action flex">
                        {/* Input field for the topic title */}
                        <input
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Topic title"
                            className="input input-bordered w-full max-full"
                        />
                        
                        {/* Input field for the topic description */}
                        <input
                            onChange={e => setDescription(e.target.value)}
                            type="text"
                            placeholder="Topic description"
                            className="input input-bordered w-full max-full"
                        />
                        
                        {/* Submit button */}
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

// Export the AddTask component as the default export of this module
export default AddTask;
