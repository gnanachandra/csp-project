import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AdminSideDashboard from "../AdminDashboard/AdminSideDashboard";


const AdminComplaints = () => {
  const [compData, setCompData] = useState([])
  useEffect(() => {
    getAllComplaints();
  }, []);

  const getAllComplaints = async () => {
    try {
      let response = await fetch("/get_complaints", {
        method: "GET",
      });

      let data = await response.json();
      setCompData(data.data.data)
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
                  Complaint Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Area
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Landmark
                </th>
                <th scope="col" className="py-3 px-6">
                  Locality
                </th>
                <th scope="col" className="py-3 px-6">
                  Note
                </th>
                <th scope="col" className="py-3 px-6">
                  Username
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {compData.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.complaintId}
                  </th>
                  <td className="py-4 px-6">
                    {item.area}
                  </td>
                  <td className="py-4 px-6">{item.date}</td>
                  <td className="py-4 px-6">{item.landmark}</td>
                  <td className="py-4 px-6">{item.locality}</td>
                  <td className="py-4 px-6">
                    {item.note}
                  </td>
                  <td className="py-4 px-6">{item.username}</td>
                  <td className="py-4 px-6">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaints;
