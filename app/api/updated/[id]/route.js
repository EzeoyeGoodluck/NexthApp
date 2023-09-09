// Import necessary modules and dependencies
import { connectMongoDB } from "/lib/mongodb"; // Import the function for connecting to MongoDB
import Topic from "models/topic"; // Import the "Topic" model representing topics in the database
import { NextResponse } from "next/server"; // Import Next.js's NextResponse for handling responses in Next.js applications

// Define an asynchronous function to handle HTTP PUT requests for updating a topic's completion status
export async function PUT(req, { params }) {
    // Extract the "id" parameter from the request's "params" object
    const { id } = params;

    // Connect to the MongoDB database
    await connectMongoDB();

    // Find a topic document in the "Topic" model by its ID
    const topic = await Topic.findById({ _id: id });

    // Update the "isCompleted" field of the topic to true
    await Topic.findByIdAndUpdate({ _id: id }, { isCompleted: true });

    // Return a JSON response indicating that the topic has been updated with a 200 status code
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}
