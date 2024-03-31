import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DriverSidebarDashboard from "../DriverSidebarDashboard/DriverSidebarDashboard";
// import DropdownStatus from "./DropdownStatus";
import { FaPen } from 'react-icons/fa'
import { BiPencil } from 'react-icons/bi';

const DriverAssignTask = () => {

  const [editStatus, setEditStatus] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [newStatus, setNewStatus] = useState(null);
  // const 

  useEffect(() => {
    getAssignTask();
  }, []);

  const getAssignTask = async () => {
    try {
      var driverName = Cookies.get("drivername");
      let response = await fetch(`/get_driver_actions/${driverName}`, {
        method: "GET",
      });

      let data = await response.json();
      setTaskData(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (_id, drivername, area, locality, landmark, date) => {
    // console.log(newStatus);
    try {
      let response = await fetch(`/update_action/${_id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          _id,
          drivername, 
          area, 
          locality, 
          landmark, 
          status: newStatus, 
          date
        }),
      });

      let data = await response.text();
      // window.alert("update successfull")
    }
    catch(error){
      console.log(error);
    }
}


  return (
    <div>
      <DriverSidebarDashboard />
      <div>
        <div className=" sm:rounded-lg pt-[10rem] pl-[20rem] pr-[5rem]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Driver Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Task Type
                </th>
                <th scope="col" className="py-3 px-6">
                  Landmark
                </th>
                <th scope="col" className="py-3 px-6">
                  Locality
                </th>
                <th scope="col" className="py-3 px-6">
                  Area
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {
                taskData !== undefined && taskData.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.drivername}
                    </th>
                    <td className="py-4 px-6">
                      {item.binId ? "New Bin" : "New Complaint"}
                    </td>
                    <td className="py-4 px-6">{item.landmark}</td>
                    <td className="py-4 px-6">{item.locality}</td>
                    <td className="py-4 px-6">{item.area}</td>
                    <td className="py-4 px-6">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {item.date}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-5">
                        <input
                          className="w-28 text-md bg-gray-500 text-white px-2 py-1.5"
                          onChange={(e) => setNewStatus(e.target.value)}
                          defaultValue={(item._id === editStatus ? newStatus : item.status)}
                          disabled={editStatus !== item._id ? true : false}
                        />
                        {
                          editStatus && editStatus===item._id?
                            <button onClick={()=>{handleUpdate(item._id, item.drivername, item.area, item.locality, item.landmark, item.date); 
                              setEditStatus(false);}}>Save</button>
                            :
                            <BiPencil onClick={() =>{setEditStatus(item._id)}} fontSize="20px" style={{ cursor: "pointer" }} />
                        }
                      </div>

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverAssignTask;
