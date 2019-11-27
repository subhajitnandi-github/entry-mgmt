import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import bg from './bg.jpg'

class CheckIn extends Component {
	render() {
		return (
			<Fragment>
				<div className="jumbotron jumbotron-fluid">
					<div className="container text-center">
						<h1 className="display-4">Entry Management Software</h1>
						<p className="lead">
							A simple visitor management system to provide a smart and secure visitor experience.
							Give your guests the welcome they deserve.
						</p>
						<hr className="my-4" />

						<Link
							className="btn btn-outline-success btn-lg mt-4 px-5 mr-5"
							to="/visitor"
							role="button"
						>
							Visitor
						</Link>
						<Link className="btn btn-outline-danger btn-lg mt-4 px-5 ml-5" to="/host" role="button">
							Host
						</Link>
					</div>
				</div>
				<div
					className="jumbotron jumbotron-fluid my-0"
					style={{ backgroundImage: `url(${bg})`, height: '35vh' }}
				></div>
			</Fragment>
		)
	}
}

export default CheckIn
