// Import necessary modules and dependencies
import { NextResponse } from "next/server"; // Import Next.js's NextResponse for handling responses in Next.js applications
import { connectMongoDB } from "/lib/mongodb"; // Import the function for connecting to MongoDB
import User from "/models/user"; // Import the "User" model representing users in the database

// Define an asynchronous function to handle HTTP POST requests for finding a user by email
export async function POST(req) {
    try {
        // Connect to the MongoDB database
        await connectMongoDB();

        // Extract the "email" from the JSON request body
        const { email } = await req.json();

        // Find a user in the "User" model by their email and select only the "_id" field
        const user = await User.findOne({ email }).select("_id");


        // Return a JSON response containing the retrieved user
        return NextResponse.json({ user });
    } catch (error) {
        // Handle errors and log them to the console
        console.log(error);
    }
}
