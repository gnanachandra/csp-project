import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const [cookie, setCookie] = useState(false);
  const navigate = useNavigate();
  console.log(cookie)
  useEffect(() => {
    let cookies = Cookies.get();
    console.log(cookies)
    if (cookies.userId !== undefined) {
      setCookie("usertoken")
    } else if (cookies.driverId !== undefined) {
      setCookie("drivertoken")
    } else if (cookies.adminId !== undefined) {
      setCookie("admintoken");
    }
  }, [Cookies.get()])

  const adminLogout = async () => {
    await fetch('/admin_logout')
      .then((res) => {
        toast.success("Logout successful")

        navigate("/");
        setCookie(false);
        Cookies.remove("admintoken", { path: "" });
        Cookies.remove("adminName", { path: "" });
        Cookies.remove("adminId", { path: "" });
      })
      .catch(error => console.log(error));
  }

  const userLogout = async () => {
    await fetch('/user_logout')
      .then((res) => {
        toast.success("Logout successful");

        navigate("/");
        Cookies.remove("usertoken", { path: "" });
        Cookies.remove("username", { path: "" });
        Cookies.remove("userId", { path: "" });
        setCookie(false);
      })
      .catch(error => console.log(error));
  }
  const driverLogout = async () => {
    await fetch('/driver_logout')
      .then((res) => {
        toast.success("Logout successful")

        navigate("/");
        Cookies.remove("drivertoken", { path: "" });
        Cookies.remove("drivername", { path: "" });
        Cookies.remove("driverId", { path: "" });

        setCookie(false);
      })
      .catch(error => console.log(error));
  }
  if (cookie === "usertoken") {
    return (
      <div>
        <nav className="bg-white font-Poppins px-2 sm:px-4 py-2 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <h2 className='text-white text-xl font-bold border-2 px-2.5 py-1.5 rounded-full bg-slate-800' >W</h2>
            </Link>
            <div className="flex md:order-2">
              {
                cookie && <button onClick={userLogout} type="button" className="inline-block px-5 py-2.5 border-slate-500 border-2 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Logout</button>

              }
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">



              </ul>
            </div>
          </div>
        </nav>

      </div>
    )
  }
  else if (cookie === "admintoken") {
    return (
      <div>
        <nav className="bg-white font-Poppins px-2 sm:px-4 py-2 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <h2 className='text-white text-xl font-bold border-2 px-2.5 py-1.5 rounded-full bg-slate-800' >W</h2>
            </Link>
            <div className="flex md:order-2">
              {
                cookie && <button onClick={adminLogout} type="button" className="inline-block px-5 py-2.5 border-slate-500 border-2 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Logout</button>

              }
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">

              </ul>
            </div>
          </div>
        </nav>

      </div>
    )
  }
  else if (cookie === "drivertoken") {
    return (
      <div>
        <nav className="bg-white font-Poppins px-2 sm:px-4 py-2 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <h2 className='text-white text-xl font-bold border-2 px-2.5 py-1.5 rounded-full bg-slate-800' >W</h2>
            </Link>
            <div className="flex md:order-2">

              {
                cookie && <button onClick={driverLogout} type="button" className="inline-block px-5 py-2.5 border-slate-500 border-2 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Logout</button>

              }

              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">

              </ul>
            </div>
          </div>
        </nav>

      </div>
    )
  }
  else {
    return (
      <div>
        <nav className="bg-white font-Poppins px-2 sm:px-4 py-2 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <h2 className='text-white text-xl font-bold border-2 px-2.5 py-1.5 rounded-full bg-slate-800' >W</h2>
            </Link>
            <div className="flex md:order-2">

              {
                cookie && <button onClick={userLogout} type="button" className="inline-block px-5 py-2.5 border-slate-500 border-2 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Logout</button>

              }
              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">
                <li>
                <Link to="/" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                </li>
                <li>
                  <Link to="/admin_login" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin Login</Link>
                </li>
                <li>
                  <Link to="/driver_login" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Worker Login</Link>
                </li>
                <li>
                  <Link to="/user_login" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">User Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>)
  }

}


export default Navbar;
