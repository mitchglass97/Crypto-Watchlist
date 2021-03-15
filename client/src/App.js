import "./App.css";
import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";

function App() {
	// by default, user is not authenticated
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	const isAuth = async () => {
		try {
			const checkIfTokenVerified = await fetch("http://localhost:5000/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			if (checkIfTokenVerified.ok) {
				setAuth(true);
			} else {
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
				<div className='container'>
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
				</div>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
