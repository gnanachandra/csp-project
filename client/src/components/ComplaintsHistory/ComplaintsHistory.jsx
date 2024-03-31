import React, { useEffect, useState } from "react";
import UserDashboard from "../UserDashboard/UserDashboard";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

const ComplaintsHistory = () => {

  const [complains, setComplains] = useState([]);

  const loadComplains = async () => {
    var userToken = Cookies.get("usertoken");
    if (userToken) {
      var userId = Cookies.get("userId");
      toast.success(userId)
      const res = await fetch(`/get_user_complaints/${userId}`, {
        method: "GET",
      });
      const complain = await res.json();
      console.log(complain)
      setComplains(complain.data.data);
    }
  }

  useEffect(() => {
    loadComplains();
  }, [])

  return (
    <>
      <UserDashboard />

      <div>
        <div className=" sm:rounded-lg pt-[10rem] pl-[20rem] pr-[5rem]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Complaint Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Username
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>
                <th scope="col" className="py-3 px-6">
                  Area
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {
                complains.map((item, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.complaintId}
                    </th>
                    <td className="py-4 px-6">{item.username}</td>
                    <td className="py-4 px-6">{item.phone}</td>
                    <td className="py-4 px-6">{item.area}</td>
                    <td className="py-4 px-6">{item.date}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComplaintsHistory;
