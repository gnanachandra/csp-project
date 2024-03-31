import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AdminSideDashboard from "../AdminDashboard/AdminSideDashboard";
import DriverSidebarDashboard from "../DriverSidebarDashboard/DriverSidebarDashboard";



const AdminAllDriverJsx = () => {
  const [driverData, setDriverData] = useState([])
  useEffect(() => {
    getAllDrivers();
  }, []);

  const getAllDrivers = async () => {
    try {
      let response = await fetch("/get_drivers", {
        method: "GET",
      });

      let data = await response.json();
      setDriverData(data.data.data)
      console.log(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminSideDashboard />
      <div>
        <div className=" sm:rounded-lg pt-[10rem] pl-[20rem] pr-[5rem]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Worker Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Worker Name
                </th>
                <th scope="col" className="py-3 px-6">
                  License Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>

              </tr>
            </thead>
            <tbody>
              {driverData.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.driverId}
                  </th>
                  <td className="py-4 px-6">
                    {item.name}
                  </td>
                  <td className="py-4 px-6">{item.licenseid}</td>
                  <td className="py-4 px-6">{item.email}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAllDriverJsx;
