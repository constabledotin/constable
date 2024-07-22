"use client";
import { useState, useEffect } from "react";
import { initFlowbite } from "flowbite";

function ShowQuestion() {
    const [question, setQuestion] = useState({
        id: "",
        question: "",
        options: [""],
        history: [{ examName: "NO", examYear: "NO" }],
    });
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [rightAnswer, setRightAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isStartTest, setIsStartTest] = useState(false);

    const answerClass = `my-4 text-xs font-medium me-2 px-2.5 py-1.5 rounded border ${isCorrect
            ? "bg-green-100 text-green-800 border-green-400"
            : "bg-red-100 text-red-800 border-red-400"
        }`;

    const getQuestion = async () => {
        sendAnswer();
        setIsCorrect(true);
        setShowAnswer(false);
        try {
            const response = await fetch("/api/user/question-paper/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setQuestion({
                id: result.data._id,
                question: result.data.question,
                difficulty: result.data.difficulty,
                answer: result.data.answer,
                options: result.data.options,
                subject: result.data.subject,
                topic: result.data.topic,
                subtopic: result.data.subtopic,
                videoLink: result.data.videoLink,
                solution : result.data.solution,
                history: result.data.history || [{ examName: "", examYear: "" }],
            });
            setRightAnswer("");
        } catch (error) {
            console.log(error);
        }
    };

    const showQuestionAnswer = () => {
        setShowAnswer(true);
        if (question.answer != selectedAnswer) {
            setIsCorrect(false);
        } else {
            setIsCorrect(true);
        }
        setRightAnswer(question.answer);
    };

    const sendAnswer = async () => {
        const payload = {
            answer: selectedAnswer,
            questionId: question.id,
        };
        try {
            const response = await fetch("/api/user/question-paper/submit-answer", {
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initFlowbite();
        getQuestion();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            {!isStartTest ? (
                <>
                    <div className="h-screen bg-dark-400 grid grid-cols-1 gap-4  content-center ">
                        <button
                            onClick={() => setIsStartTest(true)}
                            className="justify-self-center lg:w-64 w-32 align-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            Start
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <div className="py-8 px-4 mx-auto max-w-screen-xl">
                        <div className="font-light text-gray-800 sm:text-lg dark:text-gray-100">
                            Question{" "}
                            <p
                                className="mb-4"
                                dangerouslySetInnerHTML={{ __html: question.question }}
                            ></p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div
                            className="basis-3/4  mx-2 bg-white p-8 rounded-md shadow-md"
                            style={{ border: "1px solid black" }}
                        >
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
                                                onChange={(e) => {
                                                    setSelectedAnswer(`${String.fromCharCode(65 + index)}`);
                                                }}
                                                required
                                            />
                                            <label htmlFor={`q1${index}`} className="text-gray-700">
                                                {`${String.fromCharCode(65 + index)}. ${option}`}
                                            </label>
                                        </div>
                                    ))}
                                    {showAnswer ? (
                                        <span className={answerClass}>Answer : {rightAnswer}</span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </form>

                            <button
                                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me:0 lg:me-2  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() => {
                                    showQuestionAnswer();
                                }}
                            >
                                Answer
                            </button>
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me:0 lg:me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => {
                                    getQuestion();
                                }}
                            >
                                Next
                            </button>
                        </div>

                        <div className="bg-dark basis-1/4 ml-2">
                            <div className="my-4">
                                <span class=" bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Subject :{question.subject}
                                </span>
                            </div>
                            <div>
                                <span class="bg-purple-100 rounded text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                    Topic : {question.topic}
                                </span>
                            </div>
                            <div className="my-4">
                                <span class=" bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-100">
                                    Level : {question.difficulty}
                                </span>
                            </div>
                            <div className="my-4">
                                <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                    History :{" "}
                                    {question.history[0].examName +
                                        " " +
                                        question.history[0].examYear}
                                </span>
                            </div>
                            <div className="my-10">
                                <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400">
                                    Subtopic : {question.subtopic}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 px-4 mx-auto max-w-screen-xl">
                        <div className="font-light text-gray-800 sm:text-lg dark:text-gray-100">
                            Solution{" "}
                            <p
                                className="mb-4"
                                dangerouslySetInnerHTML={{ __html: question.solution }}
                            ></p>
                        </div>
                    </div>
                    <div className="p-12 flex items-center justify-center">
                        <iframe width="700" height="345" src={question.videoLink}></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ShowQuestion;
