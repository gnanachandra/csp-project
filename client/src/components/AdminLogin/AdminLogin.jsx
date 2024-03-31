import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/admin_login', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                email, password
            })
        }).then((res) => {
            if (res.status === 400) {
                toast.error("Something went wrong")
            }
            else if (res.status === 201) {
                localStorage.setItem("loggedIn", JSON.stringify("true"))
                toast.success("Login successful")
                navigate("/admin_dashboard");
                setTimeout(() => {
                    var admintoken = Cookies.get('admintoken');
                    if (admintoken) {
                        Cookies.remove('admintoken', { path: '' });
                        Cookies.remove('adminId', { path: '' });
                        window.alert("User Logged Out");
                        navigate('/');
                        navigate('/');
                        window.location.reload();
                    }
                    else {
                        Cookies.remove('admintoken', { path: '' });
                        Cookies.remove('adminId', { path: '' });
                        console.log("user already logged out");
                    }
                }, 10000000);

            }
            else if (res.status === 403) {
                window.alert("Enter Correct Details");
            }
            else if (res.status === 401) {
                window.alert("Account not Exist");
            }
        }).catch((error) => {
            console.log(error);
            window.alert("Invalid Login");
        });
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login in Admin Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                                </div>
                                <button onClick={handleSubmit} type="submit" className="w-full inline-block px-6 py-2 border-2 border-slate-500 text-white hover:bg-slate-900 hover:border font-medium text-sm leading-tight uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Sign in</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminLogin