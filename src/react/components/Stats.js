import React from 'react';
import PropTypes from 'prop-types';

function Stats(props) {
	let total = props.notes.length;
	let completed = props.notes.filter(note => note.completed).length;
	let notCompleted = total - completed;

	return(
		<div className="stat">
			<span className="stat-item">Всего заметок: {total}</span>
			<span className="stat-item">Выполнено: {completed}</span>
			<span className="stat-item">Осталось: {notCompleted}</span>
		</div>
	);
}

Stats.propTypes = {
	notes: PropTypes.array.isRequired
};

export default Stats;