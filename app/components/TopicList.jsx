"use client";

// Import necessary components and libraries
import RemoveBtn from "../components/RemoveBtn";
import CompleteBtn from "../components/CompleteBtn";
import EditItem from "../components/EditItem";
import { HiPencilAlt } from "react-icons/hi";

import Link from "next/link";


// Define an asynchronous function to fetch topics from a local API
const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    // Check if the HTTP response is successful, otherwise throw an error
    if (!res.ok) {
      throw new Error("failed to fetch topics");
    }

    // Return the JSON data from the response
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Define a React functional component for displaying a list of topics
const TopicList = async () => {
  // Fetch topics using the getTopics function
  const { topics } = await getTopics();

  return (
    <div className="w-4xl mx-auto container">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        {topics &&
          topics.map((t) => (
            <div className="p-4 mx-4xl border border-slate-300 my-3 flex justify-between gap-5 items-start">
              <div className="flex items-center gap-4">
                <CompleteBtn id={t._id} done={t.isCompleted}    />
                <div className={t.isCompleted ? "line-through" : ""}>
                  {/* Display the topic title and description */}
                  <h2 className="font-bold text-2xl">{t.title}</h2>
                  <div>{t.description}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <span>
                  {/* Render a Remove button component with the topic ID */}
                  <RemoveBtn id={t._id} />
                </span>
                {/* Create a link to edit the topic */}
                <Link href={`/editTopics/${t._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopicList;
