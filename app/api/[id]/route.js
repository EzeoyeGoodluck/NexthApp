// Import necessary modules and dependencies
import { connectMongoDB } from "/lib/mongodb"; // Import the function for connecting to MongoDB
import Topic from "models/topic"; // Import the "Topic" model
import { NextResponse } from "next/server"; // Import Next.js's NextResponse for handling responses

// Define an asynchronous function to handle HTTP PUT requests
export async function PUT(req, { params }) {
    // Extract the "id" parameter from the request's "params" object
    const { id } = params;

    // Extract the "newTitle" and "newDescription" from the JSON request body
    const { newTitle: title, newDescription: description } = await req.json();

    // Connect to the MongoDB database
    await connectMongoDB();

    // Use Mongoose to update a document in the "Topic" model by its ID
    await Topic.findByIdAndUpdate(id, { title, description });

    // Return a JSON response indicating that the topic was updated with a 200 status code
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

// Define an asynchronous function to handle HTTP GET requests
export async function GET(req, { params }) {
    // Extract the "id" parameter from the request's "params" object
    const { id } = params;

    // Connect to the MongoDB database
    await connectMongoDB();

    // Use Mongoose to find a document in the "Topic" model by its ID
    const topic = await Topic.findOne({ _id: id });

    // Return a JSON response containing the retrieved topic with a 200 status code
    return NextResponse.json({ topic }, { status: 200 });
}
