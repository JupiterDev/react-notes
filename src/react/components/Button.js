import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
	return (
		<button className={props.className} onClick={props.onClick} {...props}>
			{props.children ? props.children : "Добавить"}
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func
};

export default Button;