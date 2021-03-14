import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
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

			const logInUser = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			// If server response status is OK (status code 200), we receive a JWT token.
			// Save the token to browser local storage
			if (logInUser.ok) {
				const parseResponse = await logInUser.json();
				localStorage.setItem("token", parseResponse.token);
				setAuth(true);
			} else {
				console.log("error logging in");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<h3 className='text-center my-5'>Login</h3>
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
				<button className='btn btn-success btn-block form-control my-3'>Login</button>
			</form>
			<Link to='/login'>Log In</Link>
			<br />
			<Link to='/register'>Sign Up</Link>
		</Fragment>
	);
};

export default Login;
