import { Fragment, useState } from "react";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";

const NavBar = (props) => {
	const [username, setUsername] = useState("");

	const logout = (e) => {
		e.preventDefault();

		localStorage.removeItem("token");
		props.setAuth(false);
	};

	// Fetch username from server
	const fetchUsername = async () => {
		const response = await fetch("http://localhost:5000/dashboard/username", {
			method: "GET",
			headers: { token: localStorage.token },
		});
		const parseResponse = await response.json();
		setUsername(parseResponse);
	};

	if (props.authState) {
		fetchUsername();
	}

	return (
		<nav
			className='navbar navbar-expand-md d-flex justify-content-center navbar-dark fixed-top align-items-center'
			id='header'
		>
			<div className='container-fluid'>
				<a className='navbar-brand' href='/'>
					<img src={logo}></img>
					<span id='navbar-brand-text'>Crypto Watchlist</span>
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarResponsive'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarResponsive'>
					{props.authState && (
						<ul className='navbar-nav ml-auto' id='navbar-user-text'>
							<li className='nav-item'>
								<a className='nav-link mb-3'>{username}</a>
							</li>
							<li className='nav-item'>
								<div className='dropdown'>
									<img
										src={avatar}
										className='dropdown-toggle'
										type='button'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									></img>
									<div
										className='dropdown-menu'
										aria-labelledby='dropdownMenuButton'
									>
										<a
											className='dropdown-item'
											onClick={(e) => logout(e)}
										>
											Log Out
										</a>
									</div>
								</div>
							</li>
						</ul>
					)}
					{!props.authState && (
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<a
									className='nav-link'
									href='/login'
									id='navbar-login-text'
								>
									Log In
								</a>
							</li>
							<li className='nav-item'>
								<button
									className='btn form-control'
									id='navbar-signup-button'
								>
									<a href='/register'>SIGN UP</a>
								</button>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
