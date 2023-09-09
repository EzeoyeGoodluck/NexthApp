'use client'; 

// Import the necessary modules and functions
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import { useState } from 'react'; 
import { signIn } from "next-auth/react"; 

// Define a functional component named 'LoginForm'
const LoginForm = () => {
    // Define state variables using the useState hook
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const[loading, setIsLoading] = useState(false) 

    // Access the router using the useRouter hook
    const router = useRouter();

    // Define a function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {

            setIsLoading(true);

            // Attempt to sign in using the 'credentials' provider
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false, // Disable automatic redirection
            });

            // Check if there is an error in the response
            if (res.error) {
                setError("Invalid Credentials"); // Set an error message
                setIsLoading(false)
                return;
            }

            // Redirect to the 'dashboard' route
            router.replace("dashboard");
        } catch (error) {
            console.log('An error occurred while signing in:', error); // Log any errors to the console
        }
    }

    // Render the login form component
    return (
        <div className='grid place-items-center h-screen '>
            <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
                <h1 className='text-xl font-bold my-4'>Login</h1>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    {/* Input field for email */}
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder='Email' />

                    {/* Input field for password */}
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />

                    {/* Submit button */}
                    <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>  {loading ? 'Loading...' : 'Login' }</button>

                    {/* Display error message if there is an error */}
                    {error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>
                    )}

                    {/* Link to the registration page */}
                    <Link className='text-sm mt-3 text-right' href={'/register'}>
                        Don't have an account? <span className='underline'>Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm; // Export the LoginForm component as the default export
