"use client";

// Import statements for necessary libraries and components
import AddTask from "../components/AddTask";
import { BiSolidUserCircle } from "react-icons/bi"; 
import { signOut } from "next-auth/react"; 
import { useSession } from "next-auth/react"; 
import { useState } from "react"; 

// Define the Navbar component
const Navbar = () => {
  // Initialize state for managing a dropdown menu
  const [dropdown, setDropdown] = useState(false);
  
  // Use the useSession hook to access session data
  const { data: session } = useSession();
  
  // Return the JSX representing the Navbar component
  return (
    <div className="mx-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col justify-between gap-4">
        <h1 className="text-4xl font-bold ">TODO LIST</h1>
        <div className=" mx-auto container mx-w-4xl  flex justify-between items-center">
          <div>
            {/* User icon with a click event to toggle the dropdown */}
            <BiSolidUserCircle
              size={45}
              onClick={() => setDropdown(!dropdown)}
              className="cursor-pointer"
            />
            {/* Display the user's name */}
            <span className="font-bold capitalize">
              Hello {session?.user?.name}
            </span>
            {/* Render the dropdown menu if dropdown is true */}
            {dropdown && (
              <div className="flex flex-col z-10 shadow-md  border border-gray-200 py-2 absolute top-25 left-8  space-y-2 rounded-md bg-white w-[250px]">
                <ul>
                  {/* List item for logging out with a click event */}
                  <li onClick={() => signOut()} className="cursor-pointer">
                    logOut
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div></div>
          {/* Render the AddTask component */}
          <AddTask />
        </div>
      </div>
    </div>
  );
};

// Export the Navbar component
export default Navbar;
