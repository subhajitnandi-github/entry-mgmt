import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { checkInVisitor, fetchHosts } from '../actions'
import './App.css'

class VisitorForm extends Component {
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

	renderSelectOptions = host => (
		<option key={host._id} value={host._id}>
			{`${host.name} ( ${host.email} )`}
		</option>
	)

	renderDropDownSelect = ({ input, label, meta }) => {
		return (
			<div className="mt-4">
				<label>{label}</label>&nbsp;&nbsp;&nbsp;
				<select {...input} className="form-control">
					<option value="">Select</option>
					{this.props.hosts.map(this.renderSelectOptions)}
				</select>
			</div>
		)
	}

	onSubmit = formValues => {
		formValues.checkInTime = new Date()
		this.props.checkInVisitor(formValues)
	}

	render() {
		return (
			<Fragment>
				<p className="text-center mt-5 display-3">
					<strong>Visitor Check-In</strong>
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
										label="Enter email address"
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
										name="hostId"
										label="Select Host"
										component={this.renderDropDownSelect}
									></Field>
								</div>
								<button
									type="submit"
									className="btn btn-outline-dark btn-lg my-5 px-5 responsive-width"
								>
									Check In
								</button>
							</div>
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
	if (formValues.hostId === '') {
		errors.hostId = 'Please select a host.'
	}

	return errors
}

const mapStateToProps = state => {
	return {
		hosts: state.hosts
	}
}

const formWrapped = reduxForm({
	form: 'visitorDetails',
	validate
})(VisitorForm)

export default connect(mapStateToProps, { checkInVisitor, fetchHosts })(formWrapped)
