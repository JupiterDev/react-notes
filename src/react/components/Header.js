import React from 'react';
import PropTypes from 'prop-types';

import Stats from './Stats';

function Header(props) {
	return(
		<div>
			<header className="title">
				<div>{props.title}</div>
			</header>
			<Stats notes={props.notes}/>
		</div>
	);
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
	notes: PropTypes.array.isRequired,
};

export default Header;