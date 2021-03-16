import "./App.css";
import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const baseURL = process.env.REACT_APP_BASE_URL;
	console.log(baseURL);
	// by default, user is not authenticated
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	const isAuth = async () => {
		try {
			const checkIfTokenVerified = await fetch(baseURL + "/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			console.log(checkIfTokenVerified);

			if (checkIfTokenVerified.ok) {
				console.log("setting true");
				setAuth(true);
			} else {
				console.log("setting false");
				setAuth(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		isAuth();
	}, []);

	return (
		<Fragment>
			<BrowserRouter>
				<ToastContainer />
				<div className='container' id='master-container'>
					<NavBar authState={isAuthenticated} setAuth={setAuth} />
					<Switch>
						<Route
							exact
							path='/'
							render={(props) =>
								!isAuthenticated ? (
									<LandingPage {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/dashboard' />
								)
							}
						/>
						<Route
							exact
							path='/register'
							render={(props) =>
								!isAuthenticated ? (
									<Register {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/dashboard' />
								)
							}
						/>
						<Route
							exact
							path='/login'
							render={(props) =>
								!isAuthenticated ? (
									<Login {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/dashboard' />
								)
							}
						/>
						<Route
							exact
							path='/dashboard'
							render={(props) =>
								isAuthenticated ? (
									<Dashboard {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/login' />
								)
							}
						/>
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
