import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setAuth }) => {
	const baseURL = process.env.REACT_APP_BASE_URL;

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const { username, password } = inputs;

	const onChangeForm = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			const body = { username, password };

			const logInUser = await fetch(baseURL + "/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			// If server response status is OK (status code 200), we receive a JWT token.
			// Save the token to browser local storage
			const parseResponse = await logInUser.json();

			if (logInUser.ok) {
				localStorage.setItem("token", parseResponse.token);
				setAuth(true);
			} else {
				console.log("yea");
				toast.error("Error: " + parseResponse.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<div
				className='container w-50 d-flex flex-column align-items-center justify-content-center bg-white'
				id='login-container'
			>
				<form onSubmit={onSubmitForm} className='d-flex flex-column align-items-center'>
					<input
						type='text'
						name='username'
						placeholder='username'
						className='form-control my-3'
						value={username}
						onChange={(e) => onChangeForm(e)}
					></input>
					<input
						type='password'
						name='password'
						placeholder='password'
						className='form-control my-3'
						value={password}
						onChange={(e) => onChangeForm(e)}
					></input>
					<button className='btn btn-success form-control my-3 login-button'>
						Register
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default Login;
