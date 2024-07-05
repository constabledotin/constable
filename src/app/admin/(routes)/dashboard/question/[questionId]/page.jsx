"use client"
import { useState, useEffect } from "react";

function Question({ params }) {
    const [question, setQuestion] = useState({ question: "", options: [] });

    const getQuestion = async () => {
        const payload = {
            questionId: params.questionId,
        };
        try {
            const response = await fetch("/api/admin/question/get-question", {
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
            console.log("result is ", result);
            setQuestion(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuestion();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    Question <p className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }}></p>
                </div>
            </div>


            <div className="flex flex-row">
                <div className="basis-3/4 mx-2 bg-white p-8 rounded-md shadow-md" style={{ border: "1px solid black" }}>
                    <form id="quizForm" className="space-y-4">
                        <div className="flex flex-col mb-4">
                            {question.options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <input
                                        type="radio"
                                        id={`q1${index}`} // Ensure unique id for each radio button
                                        name="q1" // Ensure same name for all radio buttons in a group
                                        value={option} // Use option as value for radio button
                                        className="mr-2"
                                        required
                                    />
                                    <label htmlFor={`q1${index}`} className="text-gray-700">
                                        {`${String.fromCharCode(65 + index)}. ${option}`}
                                    </label>
                                </div>
                            ))}

                            <div className="p-2 text-xl bg-primary bold text-green-300">Answer : {question.answer}</div>
                        </div>
                    </form>

                </div>

                <div className="bg-white basis-1/4 ml-2">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{question.subject}</span>
                <span class="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{question.topic}</span>
                </div>
            </div>

            <div className="p-4 flex">
            <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1">
            </iframe>
            </div>

        </section>
    );
}

export default Question;
