// Import necessary modules from Mongoose
import mongoose, { Schema, models } from "mongoose";

// Define a Mongoose schema for the "Topic" model
const topicSchema = new Schema(
  {
    // Define the fields for the "Topic" model
    title: String, // A string field for the topic title
    description: String, // A string field for the topic description
    isCompleted: {
      type: Boolean, // A boolean field for whether the topic is completed or not
      required: true, // It is required to have a value for "isCompleted"
      default: false, // The default value is set to false
    },
  },
  { timestamps: true } // Enable timestamps to automatically track createdAt and updatedAt fields
);

// Define the "Topic" model using Mongoose's "models" or create a new model if it doesn't exist
const Topic = models.Topic || mongoose.model("Topic", topicSchema);

// Export the "Topic" model as the default export of this module
export default Topic;
