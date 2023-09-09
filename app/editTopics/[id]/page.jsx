// Import the EditTopicForm component from a relative path
import EditTopicForm from "../../components/EditTopicForm";

// Define an asynchronous function to fetch a topic by its ID
const getTopicById = async (id) => {
  try {
    // Fetch the topic using the provided ID from a local API
    const res = await fetch(`http://localhost:3000/api/${id}`, {
      cache: "no-store",
    });

    // Check if the HTTP response is successful, otherwise throw an error
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    // Parse the JSON data from the response and return it
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Export an asynchronous function named EditTopic that receives the "params" object
export default async function EditTopic({ params }) {
  // Extract the "id" property from the "params" object
  const { id } = params;
  console.log("id", id);

  // Fetch the topic details by ID using the getTopicById function
  const { topic } = await getTopicById(id);

  // Extract the "title" and "description" properties from the fetched topic
  const { title, description } = topic;

  // Render the EditTopicForm component with the extracted title, description, and ID
  return <EditTopicForm title={title} description={description} id={id} />;
}
