// Register page
// Includes a form with inputs for username and password

import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const { username, password } = inputs;

	const onChangeForm = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	// When Register form is submitted, make POST request to add user to database
	// If no error, server response is 200 and sends a JWT token
	// Store the JWT token in local storage
	//
	// Server will send 401 error if: account already exists, or one of the input fields is empty

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			const body = { username, password };

			const registerUser = await fetch("http://localhost:5000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			// If server response status is OK (status code 200), we receive a JWT token.
			// Save the token to browser local storage
			if (registerUser.ok) {
				const parseResponse = await registerUser.json();
				localStorage.setItem("token", parseResponse.token);
				setAuth(true);
			} else {
				console.log("error registering account");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		//console.log(inputs);
	}, [inputs]);

	return (
		<Fragment>
			<h3 className='text-center my-5'>Register</h3>
			<form onSubmit={onSubmitForm}>
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
				<button className='btn btn-success btn-block form-control my-3'>Register</button>
			</form>
			<Link to='/login'>Log In</Link>
			<br />
			<Link to='/register'>Sign Up</Link>
		</Fragment>
	);
};

export default Register;
