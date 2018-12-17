import React from 'react';
import PropTypes from 'prop-types';

function Check(props){
	
	return(
		<button className="check-button" onClick={props.onChange}>
			{props.checked 
				? <i className="fa fa-check-square" aria-hidden="true"></i>
				: <i className="fa fa-square-o" aria-hidden="true"></i>
			}
		</button>
	);

}

Check.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Check;