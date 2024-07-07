"use client"
import { useEffect, useState } from "react";
import questionTemp from "@/components/question/questionPaperTamplate";

function QuestionGenerator() {
    const [formData, setFormData] = useState({
        heading: "",
        subheading: "",
        questions: [],
    });

    const [topic, setTopic] = useState([]);
    const [subtopic, setSubtopic] = useState([]);
    const [divs, setDivs] = useState([{ id: 1 }]); // State to track dynamically added divs

    const handleDuplicateDiv = () => {
        const newDiv = { id: divs.length + 1 };
        setDivs([...divs, newDiv]);
    };

    const handleDeleteDiv = () => {
        if (divs.length > 1) {
            const updatedDivs = divs.slice(0, -1);
            setDivs(updatedDivs);
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const inputName = name.split('_').slice(0, -1).join('_')
        if (inputName == "topic") {
            getSubtopic(formData.subjectName, value);
        }

        if (name === "heading" || name === "subheading") {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            const updatedQuestions = [...formData.questions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                [name]: value,
            };
            setFormData({
                ...formData,
                questions: updatedQuestions,
            });
        }
    };

    const generatePaper = async (e) => {
        e.preventDefault();
        console.log(formData)
        const payload = {
            formData,
        };

        try {
            const response = await fetch("/api/user/question-paper/generate", {
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
            console.log("result is ", result)
            // Generate PDF using html2pdf.js
            const options = {
                margin: 0.5,
                filename: `${formData.heading}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            const data = questionTemp(formData.heading, formData.subheading, result.data)
            const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default
            html2pdf().set(options).from(data).save();
        } catch (error) {
            console.error("Error:", error);
            // Handle the error by displaying an error message to the user
        }
    };

    const getTopic = async (subjectName) => {
        const payload = {
            subjectName: subjectName
        }
        try {
            const response = await fetch("/api/admin/subject/topic/all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setTopic(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubtopic = async (subjectName, topicName) => {
        const payload = {
            subjectName: subjectName,
            topicName: topicName
        }
        try {
            const response = await fetch("/api/admin/subject/subtopic/all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setSubtopic(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTopic(formData.subjectName);
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-2 max-w-2xxl lg:py-16 lg:mx-8">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Generate Question Paper
                </h2>
                <form onSubmit={generatePaper}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="">
                            <label
                                htmlFor="heading"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Add heading
                            </label>
                            <input
                                type="text"
                                id="heading"
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type heading"
                                required
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="subheading"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Add sub heading
                            </label>
                            <input
                                type="text"
                                id="subheading"
                                name="subheading"
                                value={formData.subheading}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type sub heading"
                                required
                            />
                        </div>
                    </div>

                    {/* Render divs */}
                    {divs.map((div, index) => (
                        <div key={index} className="grid lg:grid-cols-4 gap-2 mt-8 grid-cols-1">
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Topic
                                </label>
                                <select
                                    name={`topic_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Select topic</option>
                                    {topic.map((topic) => {
                                        return (
                                            <option key={topic._id} value={topic.topicName}>
                                                {topic.topicName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Subtopic
                                </label>
                                <select
                                    name={`subtopic_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Select Subtopic</option>
                                    {subtopic.map((subtopic) => {
                                        return (
                                            <option key={subtopic._id} value={subtopic.subtopicName}>
                                                {subtopic.subtopicName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Difficulty level
                                </label>
                                <select
                                    name={`difficulty_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Select level</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    No of Question
                                </label>
                                <input
                                    type="number"
                                    name={`noOfQuestion_${index}`}
                                    onChange={(e) => handleChange(e, index)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Write total no of question"
                                    required
                                />
                            </div>
                        </div>
                    ))}

                    {/* Button to duplicate the first div */}
                    <div className="flex flex-row-reverse mt-4">
                        <button
                            type="button"
                            onClick={handleDuplicateDiv}
                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            More
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteDiv}
                            className="mx-3 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Delete
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        Generate
                    </button>
                </form>
            </div>



        </section>
    );
}

export default QuestionGenerator;
