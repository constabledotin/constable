"use client";
import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor");
  },
  { ssr: false }
);

function CreateQuestion() {
  const [options, setOptions] = useState(["", "", "", ""]);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    subjectName: "",
    topicName: "",
    subtopicName: "",
    difficulty: 0,
    videoLink: "",
    answer: "",
    examName: "",
    examYear : ""
  });

  const [subject, setSubject] = useState([]);
  const [topic, setTopic] = useState([]);
  const [subtopic, setSubtopic] = useState([]);


  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const examYears = [];

  for (let year = startYear; year <= currentYear; year++) {
    examYears.push(year);
  }

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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
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

  const getExamList = async () => {
    try {
      const response = await fetch("/api/admin/question/get-exam-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setExams(result.data);
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

  useEffect(() => {
    getExamList();
  }, []);

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

          <div className="">
            <div className="mb-4">
              <label
                htmlFor="subjectName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Exam
              </label>
              <select
                name="examName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={formData.examName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                required
              >
                <option value="">Select exam name</option>

                {exams.map((exam) => {
                  return (
                    <option key={exam._id} value={exam.name}>
                      {exam.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="examYear"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Exam Year
              </label>
              <select
                name="examYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={formData.examYear}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                required
              >
                <option value="">Select exam year</option>

                {examYears.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

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
                {subtopic.map((subtopic) => {
                  return (
                    <option key={subtopic._id} value={subtopic.subtopicName}>
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

export default CreateQuestion;
