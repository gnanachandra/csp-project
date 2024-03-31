import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DriverSidebarDashboard from "../DriverSidebarDashboard/DriverSidebarDashboard";

const DriverDashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getAssignTask();

  }, []);


  const getAssignTask = async () => {
    var driverName = Cookies.get("drivername");
    try {
      let response = await fetch(`/get_driver_actions/${driverName}`, {
        method: "GET",
      });

      let data = await response.json();
      setTaskData(data.data.data);
      setCount(data.data.data.length);
      // console.log(data.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DriverSidebarDashboard />
      <div className=" h-screen pl-64 bg-[#111827] text-white">
        <div className="mb-5 ml-[5rem] text-2xl font-medium pt-[100px]">
          Welcome to Driver panel
        </div>
        <div className="btn mb-10 mt-5  ml-[5rem]">
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            View Profile
          </button>
        </div>
        <div className="">
          <div className="flex items-center justify-center first-line:">
            <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ml-10 mr-10  w-1/4">
              <Link to="">
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
                  Total Task Assign
                </h5>
              </Link>
              <p class="mb-3  text-gray-500 dark:text-gray-400 text-2xl  font-medium">
                {count}
              </p>
              <Link
                to="/"
                class="inline-flex items-center text-blue-600 hover:underline"
              >
                View details
                <svg
                  class="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </Link>
            </div>

            <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700  ml-10 mr-10 w-1/4">
              <Link to="">
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Total  Completed Task
                </h5>
              </Link>
              <p class="mb-3  text-gray-500 dark:text-gray-400 text-2xl  font-medium">
                {count}
              </p>
              <Link
                to="/"
                class="inline-flex items-center text-blue-600 hover:underline"
              >
                View details
                <svg
                  class="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDashboard;
