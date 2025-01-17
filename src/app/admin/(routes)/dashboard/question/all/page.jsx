"use client"
import { initFlowbite } from 'flowbite';
import { getToken } from 'next-auth/jwt';
import Link from 'next/link';
import UpdateModel from "@/components/question/UpdateModel"
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

function CreateQuestion() {
    const [questions, setQuestions] = useState([]);
    const [showModel, setShowModel] = useState(false)
    const [updateData, setUpdateData] = useState()

    const [currentPage, setCurrentPage] = useState(1); // Initialize current page
    const [totalPages, setTotalPages] = useState(10); // Placeholder for total pages (adjust as per API response)
    const pageSize = 10;
    const [questionId, setShowQuestion] = useState(null);
    const toggleDropdown = (questionId) => {
        setShowQuestion(questionId)
    };

    const goToPage = (page) => {
        console.log("page no is : ", page)
        setCurrentPage(page);
        getQuestions(page)
    };
    const getQuestions = async (currentPage) => {
        const payload = {
            page: currentPage,
            limit: pageSize
        };
        try {
            const response = await fetch("/api/admin/question/get-all-question", {
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
            setQuestions(result.data);
            setTotalPages(Math.ceil(result.totalCount / pageSize));
        } catch (error) {
            console.log(error)
        }

    }

    const handleDelete = async (questionId) => {
        const payload = {
            questionId
        };
        try {
            const response = await fetch("/api/admin/question/delete-question", {
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
                title: "Deleted successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            getQuestions();
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

    const handleEdit = async (question) => {
        setUpdateData(question)
        setShowModel(true)
    }

    useEffect(() => {
        initFlowbite();
        getQuestions();
    }, [])

    const sanitizeHTML = (htmlString) => {
        htmlString = htmlString.slice(0, 30)
        return htmlString.replace(/<[^>]*>/g, '');
    };

    return (
        <div>
            {showModel ? <UpdateModel setShowModel={setShowModel} setUpdateData={updateData} /> : <></>}

            <section className="bg-gray-50 dark:bg-gray-900 p-0 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* Start coding here */}

                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search"
                                            required=""
                                        />
                                    </div>
                                </form>
                            </div>


                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    type="button"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    <svg
                                        className="h-3.5 w-3.5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        />
                                    </svg>
                                    Add Question
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        id="actionsDropdownButton"
                                        data-dropdown-toggle="actionsDropdown"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <svg
                                            className="-ml-1 mr-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                        Actions
                                    </button>
                                    <div
                                        id="actionsDropdown"
                                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    >
                                        <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="actionsDropdownButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Mass Edit
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a
                                                href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Delete all
                                            </a>
                                        </div>
                                    </div>
                                    <button
                                        id="filterDropdownButton"
                                        data-dropdown-toggle="filterDropdown"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="h-4 w-4 mr-2 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Filter
                                        <svg
                                            className="-mr-1 ml-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="filterDropdown"
                                        className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                            Choose brand
                                        </h6>
                                        <ul
                                            className="space-y-2 text-sm"
                                            aria-labelledby="filterDropdownButton"
                                        >
                                            <li className="flex items-center">
                                                <input
                                                    id="apple"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="apple"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Apple (56)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="fitbit"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="fitbit"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Microsoft (16)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="razor"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="razor"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Razor (49)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="nikon"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="nikon"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Nikon (12)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="benq"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="benq"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    BenQ (74)
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            QuestionId
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Question
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Subject
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Topic
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            SubTopic
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Level
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Created By
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        questions.map((question) => {
                                            return (
                                                <tr key={question._id} className="border-b dark:border-gray-700">
                                                    <td className="px-4 py-3">{question.qid}</td>
                                                    <th
                                                        scope="row"
                                                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {sanitizeHTML(question.question)}
                                                    </th>
                                                    <td className="px-4 py-3">{question.subject}</td>
                                                    <td className="px-4 py-3">{question.topic}</td>
                                                    <td className="px-4 py-3">{question.subtopic}</td>
                                                    <td className="px-4 py-3">{question.difficulty}</td>
                                                    <td className="px-4 py-3">{question.createdBy.name}</td>
                                                    <td className="px-4 py-3 flex items-center justify-end">
                                                        <button
                                                            id="apple-imac-27-dropdown-button"
                                                            data-dropdown-toggle="apple-imac-27-dropdown"
                                                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                            type="button"
                                                            onClick={() => { toggleDropdown(question._id) }}
                                                        >
                                                            <svg
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div
                                                            id="apple-imac-27-dropdown"
                                                            className={questionId === question._id ? ' z-10 w-44 bg-gray rounded divide-y divide-gray-100 shadow dark:  bg-gray-700 dark:divide-gray-600' : 'hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'}                                                        >
                                                            <ul
                                                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                                aria-labelledby="apple-imac-27-dropdown-button"
                                                            >
                                                                <li>
                                                                    <Link className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" href={`/admin/dashboard/question/${question._id}`}>Show</Link>
                                                                </li>
                                                                <li>

                                                                    <button
                                                                        onClick={() => { handleEdit(question) }}
                                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <div className="py-1">
                                                                        <button
                                                                            onClick={() => {
                                                                                Swal.fire({
                                                                                    title: "Are you sure?",
                                                                                    text: "You want to delete this user?",
                                                                                    icon: "warning",
                                                                                    dangerMode: true,
                                                                                }).then((willDelete) => {
                                                                                    handleDelete(question._id)
                                                                                });
                                                                            }}
                                                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                        <nav
                            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                            aria-label="Table navigation"
                        >
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    1-10
                                </span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    1000
                                </span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <button

                                        className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        onClick={() => {
                                            goToPage(currentPage - 1)
                                        }}
                                        disabled={currentPage === 1}

                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        {currentPage + 1}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        {currentPage + 2}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        {currentPage + 3}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        ...
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        100
                                    </a>
                                </li>
                                <li>
                                    <button

                                        className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        onClick={() => {
                                            goToPage(currentPage + 1)
                                        }}
                                    >


                                        <span className="sr-only" >Next</span>
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default CreateQuestion

