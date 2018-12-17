import React from 'react';
import PropTypes from 'prop-types';

function Delete(props) {
	return(
		<button className="delete-button" onClick={props.onClick}>
			<i className="fa fa-trash-o" aria-hidden="true"></i>
		</button>
	);
}

Delete.propTypes = {
	icon: PropTypes.string,
	onClick: PropTypes.func
};

export default Delete;