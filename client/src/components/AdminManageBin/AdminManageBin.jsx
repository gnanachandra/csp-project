import React, { useEffect, useState } from "react";
import AdminSideDashboard from "../AdminDashboard/AdminSideDashboard";
import AdminManagerAssignBin from "./AdminManageAssignBin";

const AdminManageBin = () => {
  const [drivername, setDriverName] = useState("");
  const [area, setArea] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");
  const [date, setDate] = useState("");
  const [action, setAction] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  const allClear = () =>{
     setDriverName("")
     setArea("")
     setLocality("")
     setLandmark("")
     setDate("")
     setAction("")
  }

  useEffect(() => {
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("/create_bin", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          drivername,
          area,
          locality,
          landmark,
          action,
          date,
        }),
      });

      let data = await response.text();
      console.log(data);
      allClear()
      window.alert("Bin Created Successfully");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <AdminSideDashboard />
      <div className="w-full flex">
        <section className="text-gray-400 bg-gray-900 body-font flex justify-end mt-[100px] w-full  h-[100%]">
          <div className="w-[60%] bg-gray-800 mt-[40px] bg-opacity-50 rounded-lg px-10 py-10 flex flex-col justify-center   md:mt-0 ml:32">
            <h2 className="text-white text-lg font-bold title-font mb-5 text-center">
              Create Bin
            </h2>
            <div className="relative flex flex-col mb-4">
              <label for="username" className="leading-7 text-sm text-gray-400">
                Driver Name
              </label>
              <input
                onChange={(e) => setDriverName(e.target.value)}
                type="text"
                id="username"
                name="username"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex flex-col mb-4">
              <label for="phone" className="leading-7 text-sm text-gray-400">
                Area
              </label>
              <input
                onChange={(e) => setArea(e.target.value)}
                type="phone"
                id="phone"
                name="phone"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex flex-col mb-4">
              <label for="area" className="leading-7 text-sm text-gray-400">
                Locality
              </label>
              <input
                onChange={(e) => setLocality(e.target.value)}
                type="text"
                id="area"
                name="area"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex flex-col mb-4">
              <label for="locality" className="leading-7 text-sm text-gray-400">
                Landmark
              </label>
              <input
                onChange={(e) => setLandmark(e.target.value)}
                type="text"
                id="locality"
                name="locality"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex flex-col mb-4">
              <label for="email" className="leading-7 text-sm text-gray-400">
                Action
              </label>
              <input
                onChange={(e) => setAction(e.target.value)}
                type="text"
                id="landmark"
                name="landmark"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex flex-col mb-4">
              <label for="date" className="leading-7 text-sm text-gray-400">
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date"
                name="date"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              disabled={btnDisable}
              onClick={handleSubmit}
              className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50"
            >
              Send Complaint
            </button>
          </div>
        </section>
        <section className="text-gray-400 bg-gray-900 body-font flex justify-center mt-[100px] w-full  h-[100%]">
        <AdminManagerAssignBin/>
        </section>
      </div>
    </div>
  );
};

export default AdminManageBin;
