import React from 'react';
import PropTypes from 'prop-types';

import Check from './Check';
import Button from './Button';
import Delete from './Delete';

class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editing: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		let title = this.refs.title.value;

		this.props.onEdit(this.props.id, title);
		this.setState({ editing: false });
	}

	render() {
		return(this.state.editing ?
			<form className="note-editform" onSubmit={this.handleSubmit}>
				<input className="note-editform__input" type="text" ref="title" defaultValue={this.props.title}/>
				<Button className="note-editform__button" type="submit"><i className="fa fa-floppy-o"></i></Button>
			</form>
			:
			<div className={`note${this.props.completed ? ' completed' : ''}`}>
				<Check checked={this.props.completed} onChange={() => this.props.onStatusChange(this.props.id)}/>
				<span className='note-text'>{this.props.title}</span>
				<div>
					<Button className="edit-button" onClick={() => this.setState({ editing: true })}><i className="fa fa-pencil-square-o"></i></Button>
					<Delete className="delete-button" onClick={() => this.props.onDelete(this.props.id)} />
				</div>
			</div>
		);
	}

} 


Note.propTypes = {
	title: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired,
	onStatusChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired
};

export default Note;