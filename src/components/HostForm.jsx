import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { checkInHost, fetchHosts } from '../actions'
import './App.css'

class HostForm extends Component {
	componentDidMount() {
		this.props.fetchHosts()
	}

	renderError({ touched, error }) {
		if (touched && error) {
			return <small className="form-text text-danger">{error}</small>
		}
	}

	renderInput = ({ input, label, type, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`
		return (
			<div className="mt-4">
				<label>{label}</label>
				<input {...input} className={className} type={type} />
				{this.renderError(meta)}
			</div>
		)
	}

	renderNumberInput = ({ input, label, type, pattern, maxLength, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`
		return (
			<div className="mt-4">
				<label>{label}</label>
				<input
					{...input}
					className={className}
					type={type}
					pattern={pattern}
					maxLength={maxLength}
				/>
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		this.props.checkInHost(formValues)
	}

	render() {
		return (
			<Fragment>
				<p className="text-center mt-5 display-3">
					<strong>Host Registration</strong>
				</p>
				<div className="row justify-content-center mt-5 mx-0">
					<div className="col-10 col-md-6">
						<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
							<div className="form-row">
								<div className="form-group col-md-6">
									<Field name="name" component={this.renderInput} label="Enter name" type="text" />
								</div>
								<div className="form-group col-md-6">
									<Field
										name="email"
										component={this.renderInput}
										label="Enter email"
										type="email"
									/>
								</div>
								<div className="form-group col-md-6">
									<Field
										name="phone"
										component={this.renderNumberInput}
										label="Enter phone number"
										type="tel"
										pattern="[6-9]{1}[0-9]{9}"
										maxLength="10"
									/>
								</div>
								<div className="form-group col-md-6">
									<Field
										name="currentAddress"
										component={this.renderInput}
										label="Enter current address"
										type="text"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="btn btn-outline-dark btn-lg my-5 px-5 responsive-width"
							>
								Register
							</button>
						</form>
					</div>
				</div>
			</Fragment>
		)
	}
}

const validate = formValues => {
	const errors = {}

	if (!formValues.name) {
		errors.name = 'Please enter a valid name.'
	}
	if (!formValues.email) {
		errors.email = 'Please enter a valid email address.'
	}
	if (!formValues.phone) {
		errors.phone = 'Please enter a valid phone number.'
	}
	if (!formValues.currentAddress) {
		errors.currentAddress = 'Please enter a valid address location.'
	}

	return errors
}

const formWrapped = reduxForm({
	form: 'hostDetails',
	validate
})(HostForm)

export default connect(null, { checkInHost, fetchHosts })(formWrapped)
