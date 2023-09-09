// Import necessary modules and dependencies
import { connectMongoDB } from "/lib/mongodb"; // Import the function for connecting to MongoDB
import Topic from "models/topic"; // Import the "Topic" model representing topics in the database
import { NextResponse } from "next/server"; // Import Next.js's NextResponse for handling responses in Next.js applications

// Define an asynchronous function to handle HTTP POST requests for creating a new topic
export async function POST(req) {
    // Extract the "title" and "description" from the JSON request body
    const { title, description } = await req.json();
    
    // Connect to the MongoDB database
    await connectMongoDB();
    
    // Create a new topic document in the "Topic" model with the provided "title" and "description"
    await Topic.create({ title, description });
    
    // Return a JSON response indicating that the topic has been created with a 201 status code
    return NextResponse.json({ message: "Topic created" }, { status: 201 });
}

// Define an asynchronous function to handle HTTP GET requests for retrieving all topics
export async function GET() {
    // Connect to the MongoDB database
    await connectMongoDB();
    
    // Retrieve all topic documents from the "Topic" model
    const topics = await Topic.find();
    
    // Return a JSON response containing the retrieved topics with a 200 status code
    return NextResponse.json({ topics });
}

// Define an asynchronous function to handle HTTP DELETE requests for deleting a topic
export async function DELETE(req) {
    // Extract the "id" parameter from the URL query string
    const id = req.nextUrl.searchParams.get('id');
    
    // Connect to the MongoDB database
    await connectMongoDB();
    
    // Find and delete a topic document in the "Topic" model by its ID
    await Topic.findByIdAndDelete(id);
    
    // Return a JSON response indicating that the topic has been deleted with a 200 status code
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
