import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

const Login = ({login, isAuthenticated}) => {
	const [formData, setFormData] = useState({
		email:'kolya@mail.ru',
		password:'111111',
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit =  async (e) => {
		e.preventDefault();
		login(email, password);
		console.log('Success')
	};

	// redirect if logged in
	if(isAuthenticated){
		return <Redirect to="/dashboard"/>
	}

	return (
		<>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead"><i className="fas fa-user"/> Sign Into Your Account</p>
			<form className="form" onSubmit={ (e) => onSubmit(e)}>
				<div className="form-group">
					<input type="email"
						   placeholder="Email Address"
						   name="email"
						   value={email}
						   onChange={onChange}
						   required
					/>
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

				<input type="submit" className="btn btn-primary" value="Login"/>
			</form>
			<p className="my-1">
				Dont have an account? <Link to="/register">Sign Un</Link>
			</p>
		</>
	)
}

Login.propTypes = {
	login:PropTypes.func.isRequired,
	isAuthenticated:PropTypes.bool
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated:state.auth.isAuthenticated
	}
};

export default connect(
	mapStateToProps,
	{login}
)(Login)