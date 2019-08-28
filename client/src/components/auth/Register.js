import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import propTypes from 'prop-types'

const Register = ({setAlert, register, isAuthenticated}) => {

	const [formData, setFormData] = useState({
		name:'',
		email:'',
		password:'',
		password2:''
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit =  async (e) => {
		e.preventDefault();

		if(password !== password2){
			setAlert('Passwords are not match', 'danger', 2500);

		}else{
			register({name, email, password});
			console.log('Success')

		}
	};

	if(isAuthenticated){
		return <Redirect to="/dashboard"/>
	}

	return (
		<>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead"><i className="fas fa-user"/> Create Your Account</p>
			<form className="form" onSubmit={ (e) => onSubmit(e)}>
				<div className="form-group">
					<input type="text"
						   placeholder="Name"
						   name="name"
						   value={name}
						   onChange={onChange}
						   />
				</div>
				<div className="form-group">
					<input type="email"
						   placeholder="Email Address"
						   name="email"
						   value={email}
						   onChange={onChange}

					/>
					<small className="form-text"
					>This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small
					>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register"/>
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</>
	)
}

Register.propTypes = {
	setAlert: propTypes.func.isRequired,
	register: propTypes.func.isRequired,
	isAuthenticated:propTypes.bool
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated:state.auth.isAuthenticated
	}
};

export default connect(
	mapStateToProps,
	{ setAlert, register }
)(Register);