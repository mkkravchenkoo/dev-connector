import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'

function Dashboard({getCurrentProfile, auth:{user}, profile:{loading, profile}}) {
	useEffect(() => {
		getCurrentProfile()
	}, [])

	return loading && profile === null ? <Spinner/> : (
		<>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user"/>
				Welcome, {user && user.name}
			</p>
			{profile !== null ?<>Has</>
				:
				<>
					<p>You have not yet setup a profile</p>
					<Link to="/create-profile" className="btn btn-primary my-1">Create profile</Link>
				</>}
		</>
	)
}

Dashboard.propTypes = {
	getCurrentProfile:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	profile:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
		profile:state.profile
	}
}

export default connect(
	mapStateToProps,
	{getCurrentProfile}
)(Dashboard);