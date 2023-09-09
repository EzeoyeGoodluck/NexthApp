// Import necessary components and libraries
import LoginForm from "./components/LoginForm"; // Import the LoginForm component
import { getServerSession } from 'next-auth'; // Import a function to get server-side authentication session
import { redirect } from "next/navigation"; // Import a function for redirection
import { authOptions } from "./api/auth/[...nextauth]/route"; // Import authentication options

// Define an asynchronous function named "page"
const page = async () => {
  // Use the "getServerSession" function to retrieve the server-side authentication session
  const session = await getServerSession(authOptions);

  // If a session exists (i.e., the user is already authenticated), redirect to the dashboard
  if (session) redirect('/dashboard');

  // Return a JSX element that represents the page content
  return (
    <main>
      <LoginForm />
    </main>
  );
};

// Export the "page" function as the default export of this module
export default page;
