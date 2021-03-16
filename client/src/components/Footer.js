import { Fragment } from "react";

const Footer = () => {
	return (
		<nav
			className='navbar navbar-expand-md d-flex fixed-bottom justify-content-center navbar-dark'
			id='footer'
		>
			<div className='container-fluid' id='footer-content'>
				<a className='navbar-brand'>© 2021 Mitch Glass</a>
				<ul className='navbar-nav ml-auto d-flex flex-row'>
					<li className='nav-item'>
						<a
							className='nav-link'
							href='https://github.com/mitchglass97/Crypto-Watchlist'
						>
							Docs
						</a>
					</li>
					<li className='nav-item' id='list-last-item'>
						<a className='nav-link' href='https://mitchglass.dev/'>
							Portfolio
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Footer;
