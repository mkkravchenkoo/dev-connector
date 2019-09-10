import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getProfiles} from "../../actions/profile";
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'


const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
	useEffect(() => {
		getProfiles()
	},[]);

	return (
		<>
			{loading ? <Spinner/> :
				<>
				<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"/> Browse and connect with developers
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map((profile) => <ProfileItem profile={profile} key={profile._id}/>)
						) : <h4>No profiles</h4> }
					</div>
				</>
			}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile
	}
 }

export default connect(
	mapStateToProps,
	{getProfiles}
)(Profiles);