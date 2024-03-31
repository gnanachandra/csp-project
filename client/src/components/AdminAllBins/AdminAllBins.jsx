import React, { useEffect } from "react";
import { useState } from "react";
import AdminSideDashboard from "../AdminDashboard/AdminSideDashboard";

const AdminAllBins = () => {
    const [binsData, setBinsData] = useState([]);
    useEffect(() => {
      getAllBins();
    }, []);
  
    const getAllBins = async () => {
      try {
          let response = await fetch("/get_bins", { 
              method: "GET",
            });
            
            let data = await response.json();
            setBinsData(data.data.data)
            console.log(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
      <div>
        <AdminSideDashboard />
        <div>
          <div className=" sm:rounded-lg pt-[10rem] pl-[20rem] pr-[5rem]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Bin Id
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Area Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Landmark
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Locality
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {binsData.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.binId}
                    </th>
                    <td className="py-4 px-6">{item.area}</td>
                    <td className="py-4 px-6">{item.landmark}</td>
                    <td className="py-4 px-6">{item.locality}</td>
                    <td className="py-4 px-6">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllBins;
