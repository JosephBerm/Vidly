import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	// console.log("NavBar - Rendered");

	return (
		<nav className='navbar navbar-expand-sm navbar-light bg-light'>
			<Link
				id='navbar-title'
				className='navbar-brand'
				to='/home'
				style={{ marginLeft: 20 }}>
				Vidly
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<div className='navbar-nav'>
					<NavLink className='nav-item nav-link' to='/home'>
						Home <span className='sr-only'>(current)</span>
					</NavLink>
					<NavLink className='nav-item nav-link' to='/movies'>
						Movies
					</NavLink>
					<NavLink className='nav-item nav-link' to='/counters'>
						Counters
					</NavLink>
					<NavLink className='nav-item nav-link' to='/login'>
						Login
					</NavLink>
					<NavLink className='nav-item nav-link' to='/login-joi'>
						Login (JOI)
					</NavLink>
					<NavLink className='nav-item nav-link' to='/register'>
						Register
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

/*
you use navlink when you want to apply the active class upon clicking.
Link doesn't have an active state like navlink. 
*/
