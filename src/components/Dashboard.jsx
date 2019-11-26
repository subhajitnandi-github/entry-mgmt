import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { fetchPendingVisitorsList, checkOutVisitor, checkOutHost } from '../actions'
import './App.css'

class Dashboard extends Component {
	componentDidMount() {
		if (this.props.isHost) {
			for (let host of this.props.hosts) {
				if (this.props.name === host.name && this.props.phone === host.phone) {
					this.props.fetchPendingVisitorsList(host._id)
					break
				}
			}
		}
	}

	renderVisitorsList() {
		if (this.props.pendingVisitorsList) {
			return this.props.pendingVisitorsList.map(visitor => {
				return (
					<Fragment>
						<div className="col-md-4"></div>
						<div
							className="shadow list-group-item mt-4 col-10 col-md-4 px-5 pointer"
							key={visitor._id}
						>
							<h5 className="text-dark">{visitor.name}</h5>
							<hr className="my-2" />
							<p>Email : {visitor.email}</p>
							<p>Phone : {visitor.phone}</p>
						</div>
						<div className="col-md-4"></div>
					</Fragment>
				)
			})
		} else {
			return <h3>No visitors currently !</h3>
		}
	}

	handleOnClickVisitor = () => {
		let { sessionId, selectedHostId } = this.props
		let reqBody = { sessionId, selectedHostId, checkOutTime: new Date() }
		this.props.checkOutVisitor(reqBody)
	}

	displayHostName() {
		for (let host of this.props.hosts) {
			if (host._id === this.props.selectedHostId) {
				return host.name
			}
		}
	}

	displayHostEmail() {
		for (let host of this.props.hosts) {
			if (host._id === this.props.selectedHostId) {
				return host.email
			}
		}
	}

	render() {
		if (this.props.isHost) {
			return (
				<Fragment>
					<div className="list-group">
						<div className="row justify-content-center mt-5 text-center mx-0">
							{this.renderVisitorsList()}
						</div>
					</div>
					<div className="row justify-content-center">
						<button
							onClick={() => {
								this.props.checkOutHost()
							}}
							className="btn btn-outline-info btn-lg mt-5 px-5"
						>
							CheckOut
						</button>
					</div>
				</Fragment>
			)
		} else {
			return (
				<div>
					<div className="card text-center">
						<div className="card-header">Meeting at {this.props.address}</div>
						<div className="card-body">
							<h5 className="card-title">{this.displayHostName()}</h5>
							<p className="card-text">
								<strong>Email : </strong>
								{this.displayHostEmail()}
							</p>
							<button
								onClick={this.handleOnClickVisitor}
								className="btn btn-outline-info btn-lg my-3 px-5"
							>
								CheckOut
							</button>
						</div>
						<div className="card-footer text-muted">
							Checked in at {moment(this.props.checkInTime).format('h:mm a')}
						</div>
					</div>
				</div>
			)
		}
	}
}

const mapStateToProps = state => {
	let {
		isHost,
		checkInTime,
		name,
		email,
		phone,
		address,
		selectedHostId,
		sessionId,
		pendingVisitorsList
	} = state.auth
	return {
		isHost,
		checkInTime,
		name,
		email,
		phone,
		address,
		selectedHostId,
		sessionId,
		pendingVisitorsList,
		hosts: state.hosts
	}
}

export default connect(mapStateToProps, {
	fetchPendingVisitorsList,
	checkOutVisitor,
	checkOutHost
})(Dashboard)
