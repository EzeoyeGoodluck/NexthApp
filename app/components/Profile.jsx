"use client";

// Import statements for necessary libraries and components
import Image from "next/image"; // Importing the Image component from Next.js
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js

// Define the Profile component
const Profile = () => {
  // Initialize the router using the useRouter hook
  const router = useRouter();

  // Return JSX that renders an image
  return (
    <Image
      alt="logo" // Alternate text for the image
      className="hidden md:block cursor-pointer" // CSS classes applied to the image
      width="100" // Width of the image
      height="100" // Height of the image
      src="/images/logo.png" // Source URL for the image
    />
  );
};

// Export the Profile component
export default Profile;
