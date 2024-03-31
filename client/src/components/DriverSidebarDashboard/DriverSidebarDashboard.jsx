import Cookies from 'js-cookie';
import React from 'react'
import { Link } from 'react-router-dom';

const DriverSidebarDashboard = () => {
  const driverName = Cookies.get("drivername");
  const driverId = Cookies.get("driverId");

  return (
    <>
      <aside class="w-64 fixed " aria-label="Sidebar">
        <div class="overflow-y-auto py-4 pt-[80px] px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen">
          <div className="flex items-center justify-center flex-col mt-4 mb-4">

            <img
              src="https://img.freepik.com/premium-vector/dump-truck-tipper-truck-silhouette-vector-illustration-best-truck-freight-related-industry_289688-214.jpg?w=2000"
              class="rounded-full w-24 mb-4  "
              alt="Avatar"
            />
            <h2 className="text-white text-xl items-center mb-2 first-letter:" >{driverName}</h2>
            <div className="mail text-white text-sm ">
              Licencse Id : {driverId}
            </div>
          </div>
          <ul class="space-y-2">
            <li>
              <Link
                to="/driver_dashboard/"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/driver_dashboard/driver_task"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Assigned Tasks
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default DriverSidebarDashboard