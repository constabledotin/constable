"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function UserActivity() {

    const [data,setData] = useState({
        thisMonth:0,
        thisWeek:0,
        thisDay : 0
    })
    const {id} = useParams();
    const getUserActivity= async()=>{
        const payload ={
            id : id
        }
        try {
            const response = await fetch("/api/admin/overview/admin-activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            setData({
                thisMonth: result.data.totalThisMonth,
                thisWeek: result.data.totalThisWeek,
                thisDay: result.data.totalToday,
            })
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            // Handle the error by displaying an error message to the user
        }
    }
    useEffect(()=>{
        getUserActivity();
    },[])

    return (

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-0 lg:px-8">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-0">
                        {/* <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                                        Total Question Added
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                                        1.6M
                                    </dd>
                                </dl>
                            </div>
                        </div> */}
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                                        This month
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                                        {data.thisMonth}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                                        This week
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                                        {data.thisWeek}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                                        Today
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                                        {data.thisDay}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
   

        </div>
    )
}

export default UserActivity