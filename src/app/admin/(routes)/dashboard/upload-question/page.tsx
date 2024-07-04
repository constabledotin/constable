"use client"
import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("../../../../../components/customEditor");
  },
  { ssr: false }
);

function Page() {
  useEffect(() => {
    initFlowbite()
   }, [])

  const [options, setOptions] = useState(["", "", "", ""]);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    difficulty: 0,
    videoLink: "",
    answer: "",
  });

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) =>
      i === index ? value : option
    );
    setOptions(newOptions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "difficulty" ? Number(value) : value,
    }));
  };

  const handleChange = (data, state) => {
    state(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      question,
      solution,
      ...formData,
      options,
    };
    try {
      const response = await fetch("/api/admin/question/add-question", {
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
      // You can also display a success message or redirect the user here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error by displaying an error message to the user
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <label
          htmlFor="question"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Question
        </label>
        <CustomEditor
          data={question}
          onChange={(event, editor) => {
            const data = editor.getData();
            setQuestion(data);
          }}
        />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4"
        >
          <div>
            {options.map((option, index) => (
              <div className="mb-4" key={index}>
                <label
                  htmlFor={`option${index + 1}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Option {String.fromCharCode(65 + index)}
                </label>
                <input
                  type="text"
                  name={`option${index + 1}`}
                  id={`option${index + 1}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={`Type option ${String.fromCharCode(65 + index)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}

            <button
              type="button"
              className="py-2 px-4 mb-4 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={addOption}
            >
              Add More Option
            </button>

            <div className="mb-4">
              <label
                htmlFor="answer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correct Answer
              </label>
              <input
                type="text"
                name="answer"
                id="answer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Specify the correct option (e.g., Option A)"
                value={formData.answer}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="">
            {["subject", "topic", "subtopic"].map((field) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <select
                  name={field}
                  id={field}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select {field}</option>
                  {field === "subject" && (
                    <>
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                    </>
                  )}
                  {field === "topic" && (
                    <>
                      <option value="Algebra">Algebra</option>
                      <option value="Geometry">Geometry</option>
                      <option value="Physics">Physics</option>
                    </>
                  )}
                  {field === "subtopic" && (
                    <>
                      <option value="Linear Equations">Linear Equations</option>
                      <option value="Quadratic Equations">
                        Quadratic Equations
                      </option>
                   
                    </>
                  )}
                </select>
              </div>
            ))}

            <div className="mb-4">
              <label
                htmlFor="difficulty"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Difficulty Level (0-5)
              </label>
              <input
                type="number"
                name="difficulty"
                id="difficulty"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                min="0"
                max="5"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoLink"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video Link
              </label>
              <input
                type="url"
                name="videoLink"
                id="videoLink"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter video link"
                value={formData.videoLink}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>

        <label
          htmlFor="question"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Solution
        </label>
        <CustomEditor
          data={solution}
          onChange={(event, editor) => {
            const data = editor.getData();
            setSolution(data);
          }}
        />

        <button
          className=" my-4 py-2 px-4 mb-4 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default Page;