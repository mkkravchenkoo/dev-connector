import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {Link} from "react-router-dom";
import {getProfileById} from "../../actions/profile";

const Profile = ({
	getProfileById,
	profile: {profile, loading},
	auth,
	match
	}) => {

	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById])

	return (
		<>
			{profile === null || loading ? <Spinner/> : (
				<>
					<Link to="/profiles" className="btn btn-light">Back to profiles</Link>
					{auth.isAuthenticated && auth.loading === false
					&& auth.user._id === profile.user._id
					&& (<Link to="edit-profile" className="btn btn-dark">Edit profile</Link>)}
				</>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		profile:state.profile,
		auth:state.auth
	}
}
export default connect(
	mapStateToProps,
	{getProfileById}
)(Profile);