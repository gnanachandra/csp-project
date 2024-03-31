import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const DriverRegister = () => {

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
		licenseid: "",
	});

	let name, value;
	const navigate = useNavigate();

	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword, licenseid } = user;

		const data = await fetch('/driver_register', {
			method: "POST",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name, email, password, cpassword, licenseid
			})
		})

		if (data.status === 401) {
			toast.error("Please Enter All The Fields");

		}
		else if (data.status === 422) {
			toast.error("User Account Already Exits");

		}
		else if (data.status === 423) {
			toast.error("Password Should Be Same");

		}
		else if (data.status >= 400) {
			toast.error("Registration Failed");
		}

		else {
			toast.success("Registration Successfull");
		}
	}
	return (
		<div>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border mt-36 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create a Driver Account
							</h1>
							<form className="space-y-4 md:space-y-6" action="#">
								<div>
									<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
									<input onChange={handleInputs} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
								</div>
								<div>
									<label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
									<input onChange={handleInputs} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
								</div>
								<div>
									<label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
									<input onChange={handleInputs} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<div>
									<label for="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
									<input onChange={handleInputs} type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<div>
									<label for="licenseid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">license Number</label>
									<input onChange={handleInputs} type="licenseid" name="licenseid" id="licenseid" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<button onClick={handleSubmit} type="submit" className="w-full inline-block px-6 py-2 border-2 border-slate-500 text-white hover:bg-slate-900 hover:border font-medium text-sm leading-tight uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Create an account</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account? <Link to="/driver_login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default DriverRegister