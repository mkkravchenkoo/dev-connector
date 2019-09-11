import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {Link} from "react-router-dom";
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
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
					<div className="profile-grid my-1">
						<ProfileTop profile={profile}/>
						<ProfileAbout profile={profile}/>
					</div>
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