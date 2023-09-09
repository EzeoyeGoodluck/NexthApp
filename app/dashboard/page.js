// Import necessary components
import Navbar from "../components/Navbar"; // Import the Navbar component
import TopicList from "../components/TopicList"; // Import the TopicList component
import { getServerSession} from 'next-auth';
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Define a functional component named "Dashboard"
const Dashboard =  async () => {
  const session = await getServerSession(authOptions)

  if(!session) redirect("/");
  
  return (
    <div>
      {/* Render the Navbar component */}
      <Navbar />

      {/* Render the TopicList component */}
      <TopicList />
    </div>
  );
};

// Export the Dashboard component as the default export of the module
export default Dashboard;
