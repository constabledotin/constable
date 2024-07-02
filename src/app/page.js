"use client"
import { initFlowbite } from 'flowbite';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
   initFlowbite()
  }, [])
  
  return (
  <>
  <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center">
  <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
    <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label
              className="sr-only"
              htmlFor="simple-search"
            >
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
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="simple-search"
                placeholder="Search"
                required
                type="text"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
          <button
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                fillRule="evenodd"
              />
            </svg>
            Add product
          </button>
          <div className="flex items-center w-full space-x-3 md:w-auto">
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              data-dropdown-toggle="actionsDropdown"
              id="actionsDropdownButton"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="-ml-1 mr-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
              Actions
            </button>
            <div
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              id="actionsDropdown"
            >
              <ul
                aria-labelledby="actionsDropdownButton"
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
              >
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    href="#"
                  >
                    Mass Edit
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  href="#"
                >
                  Delete all
                </a>
              </div>
            </div>
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              data-dropdown-toggle="filterDropdown"
              id="filterDropdownButton"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  fillRule="evenodd"
                />
              </svg>
              Filter
              <svg
                aria-hidden="true"
                className="-mr-1 ml-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <div
              className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
              id="filterDropdown"
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </h6>
              <ul
                aria-labelledby="dropdownDefault"
                className="space-y-2 text-sm"
              >
                <li className="flex items-center">
                  <input
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    defaultValue=""
                    id="apple"
                    type="checkbox"
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    htmlFor="apple"
                  >
                    Apple (56)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    defaultValue=""
                    id="fitbit"
                    type="checkbox"
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    htmlFor="fitbit"
                  >
                    Fitbit (56)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    defaultValue=""
                    id="dell"
                    type="checkbox"
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    htmlFor="dell"
                  >
                    Dell (56)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    defaultChecked
                    defaultValue=""
                    id="asus"
                    type="checkbox"
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    htmlFor="asus"
                  >
                    Asus (97)
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </>
  );
}
