import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import landingPageImage from "../assets/landing-page-image.svg";

const LandingPage = () => {
	return (
		<Fragment>
			<div
				className='container h-100 w-100 d-flex flex-column align-items-center justify-content-center'
				id='landing-page-container'
			>
				<div className='row w-100 h-100'>
					<div
						className='col-md d-flex flex-column align-items-center justify-content-center'
						id='landing-text'
					>
						<h3 className='text-left'>Crypto Watchlist</h3>
						<h2>A simple, reliable cryptocurrency monitoring platform</h2>
						<button className='btn btn-primary' id='free-account-button'>
							<a href='/register'>Create a FREE account</a>
						</button>
					</div>
					<div className='col-md d-flex flex-column align-items-center justify-content-center'>
						<img src={landingPageImage} id='landing-page-image'></img>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default LandingPage;
