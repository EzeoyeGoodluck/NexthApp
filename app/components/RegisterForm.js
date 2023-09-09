'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the RegisterForm component
const RegisterForm = () => {
  // Define state variables for form input fields and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const[loading, setIsLoading] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
        setIsLoading(true)
      // Check if the user already exists
      const resUserExists = await fetch('api/userExist', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      // If the user already exists, set an error message
      if (user) {
        setIsLoading(false)
        setError("User already exists.");
        return;
      }

      // Register the user
      const res = await fetch('api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, email, password
        }) 
      });

      if (res.ok) {
        setIsLoading(false)
        // Reset the form if registration is successful
        const form = e.target;
        form.reset();
        router.push('/')
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  }



  // Render the registration form
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={e => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            {loading  ? " Loading.." : "Register" }
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

// Export the RegisterForm component as the default export of this module
export default RegisterForm;
