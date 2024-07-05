"use client"
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";


function CreateTopic() {
    const [subjectName, setSubjectName] = useState('');
    const [topicName, setTopicName] = useState('');
    const [error, setError] = useState(null);
    const [subject, setSubject] = useState([]);

    const createTopic = async (e) => {
        e.preventDefault();

        const payload = {
            subjectName: subjectName,
            topicName: topicName
        };

        try {
            const response = await fetch("/api/admin/subject/topic/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Success:", result);
            // Optionally, you can reset the input field or perform other actions upon success
            setSubjectName('');
            setTopicName('');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to create subject. Please try again."); // Set error state
        }
    };

    const getSubject = async () => {
        try {
            const response = await fetch("/api/admin/subject/all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setSubject(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        initFlowbite();
        getSubject();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add a new Topic
                </h2>
                <form onSubmit={createTopic}>
                    <div>
                        <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                        <select id="subject" value={subjectName} onChange={(e) => { setSubjectName(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select Subject</option>
                            {subject.map((subject) => {
                                return (
                                    <option key={subject._id} value={subject.subjectName}>
                                        {subject.subjectName}
                                    </option>
                                );
                            })}

                        </select>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 my-4">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Topic Name
                            </label>
                            <input
                                type="text"
                                value={topicName}
                                onChange={(e) => setTopicName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type topic name"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        Add topic
                    </button>
                    {error && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default CreateTopic;
