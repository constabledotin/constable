"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Swal from "sweetalert2";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor");
  },
  { ssr: false }
);
function UpdateModel({ setShowModel, setUpdateData }) {
  console.log("set data is ",setUpdateData)
  const [options, setOptions] = useState(setUpdateData.options);
  const [question, setQuestion] = useState(setUpdateData.question);
  const [solution, setSolution] = useState(setUpdateData.solution);
  const [formData, setFormData] = useState({
    subjectName: setUpdateData.subject,
    topicName: setUpdateData.topic,
    subtopicName: setUpdateData.subject,
    difficulty: setUpdateData.difficulty,
    videoLink: setUpdateData.videoLink,
    answer: setUpdateData.answer,
  });

  const [subject, setSubject] = useState([]);
  const [topic, setTopic] = useState([]);
  const [subtopic, setSubtopic] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "difficulty" ? Number(value) : value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) =>
      i === index ? value : option
    );
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      questionId :setUpdateData._id,
      question,
      solution,
      ...formData,
      options,
    };
    try {
      const response = await fetch("/api/admin/question/update-question", {
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Question has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      // You can also display a success message or redirect the user here
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      // Handle the error by displaying an error message to the user
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
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

  const getTopic = async (subjectName) => {
    const payload = {
      subjectName: subjectName,
    };
    try {
      const response = await fetch("/api/admin/subject/topic/all", {
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
      setTopic(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubtopic = async (subjectName, topicName) => {
    const payload = {
      subjectName: subjectName,
      topicName: topicName,
    };
    try {
      const response = await fetch("/api/admin/subject/subtopic/all", {
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
      setSubtopic(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initFlowbite();
    getSubject();
  }, []);

  useEffect(() => {
    getTopic(formData.subjectName);
  }, [formData.subjectName]);

  useEffect(() => {
    getSubtopic(formData.subjectName, formData.topicName);
  }, [formData.topicName]);

  return (
    <div className="flex justify-center pt-20">
      <>
        {/* Modal toggle */}
        <div className="flex justify-center m-5">
          <button
            onClick={() => {
              setShowModel(false);
            }}
            className=" hidden block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
          >
            Update product
          </button>
        </div>
        {/* Main modal */}
        <div
          id="updateProductModal"
          tabIndex={-1}
          aria-hidden="false"
          className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <section className="bg-white dark:bg-gray-900">
            <div className="py-4 px-4 mx-auto max-w-screen-md">
              <div className="pt-64">
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
              </div>

              <form className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
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
                        placeholder={`Type option ${String.fromCharCode(
                          65 + index
                        )}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
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
                  <div className="mb-4">
                    <label
                      htmlFor="subjectName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Subject Name
                    </label>
                    <select
                      name="subjectName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.subjectName}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      required
                    >
                      <option value="">Select subject</option>
                      <option selected={true} value={formData.subjectName}>
                        {formData.subjectName}
                      </option>

                      {subject.map((subject) => {
                        return (
                          <option key={subject._id} value={subject.subjectName}>
                            {subject.subjectName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="topicName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Topic Name
                    </label>
                    <select
                      name="topicName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.topicName}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      required
                    >
                      <option value="">Select Topic</option>
                      <option selected={true} value={formData.topicName}>
                        {formData.topicName}
                      </option>

                      {topic.map((topic) => {
                        return (
                          <option key={topic._id} value={topic.topicName}>
                            {topic.topicName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="subtopicName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Subtopic Name
                    </label>
                    <select
                      name="subtopicName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.subtopicName}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      required
                    >
                      <option value="">Select Subtopic</option>
                      <option selected={true} value={formData.subtopicName}>
                        {formData.subtopicName}
                      </option>

                      {subtopic.map((subtopic) => {
                        return (
                          <option
                            key={subtopic._id}
                            value={subtopic.subtopicName}
                          >
                            {subtopic.subtopicName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
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
                onClick={(e) => { handleSubmit(e) }}
                className=" my-4 py-2 px-4 mb-4 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Update
              </button>
              <button
                onClick={() => {
                  setShowModel(false);
                }}
                className=" my-4 py-2 mx-4 px-4 mb-4 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Cancel
              </button>
            </div>
          </section>
        </div>
      </>
    </div>
  );
}

export default UpdateModel;
