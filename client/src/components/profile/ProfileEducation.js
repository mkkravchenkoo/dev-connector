import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({
		   experience: { school, degree, fieldofstudy, current, to, from, description }
	   }) => (
	<div>
		<h3 className="text-dark">{school}</h3>
		<p>
			<Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
			{!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
		</p>
		<p>
			<strong>Degree: </strong> {degree}
		</p>
		<p>
			<strong>Field of study: </strong> {fieldofstudy}
		</p>
		<p>
			<strong>Description: </strong> {description}
		</p>
	</div>
);

export default ProfileEducation;