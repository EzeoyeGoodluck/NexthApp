'use client';

// Import necessary modules and components
import { useState } from "react";
import Modal from "./modal";

// Define a function to fetch a topic by its ID
const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error('Failed to fetch topic');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// Define the EditItem component
const EditItem = async ({ id }) => {
    // Define state variables for managing modal visibility and task editing
    const [openModalEdit, setModalOpenEdit] = useState(false);
    const [openModalDelete, setModalOpenDelete] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState('');

    return (
        <div>
            {/* Button to open the edit item modal */}
            <button onClick={() => setModalOpenEdit(true)}>
                Edit Item
            </button>

            {/* Modal for editing an item */}
            <Modal modalOpen={openModalEdit} setModalOpen={setModalOpenEdit}>
                <form>
                    <h3 className="font-bold text-lg">Edit Item</h3>
                    <div className="modal-action">
                        {/* Input field for editing the task */}
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-full"
                        />

                        {/* Submit button */}
                        <button type="submit" className="btn">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

// Export the EditItem component as the default export of this module
export default EditItem;
