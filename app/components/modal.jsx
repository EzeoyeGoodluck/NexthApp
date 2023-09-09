'use client'
// Define a functional component named "modal"
const Modal = ({ children, modalOpen, setModalOpen }) => {
  return (
    <div>
      {/* Define a dialog element with an ID and conditional CSS class */}
      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""} `}
      >
        {/* Create a container for the modal content */}
        <div className="modal-box">
          {/* Create a button to close the modal */}
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕ {/* Display a close (X) symbol */}
          </button>

          {/* Render the content inside the modal */}
          {children}
        </div>
      </dialog>
    </div>
  );
};

// Export the "Modal" component as the default export of the module
export default Modal;
