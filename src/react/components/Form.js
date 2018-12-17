import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		let title = this.state.title;
		if (title) {
			this.props.onAdd(title);
			this.setState({ title: '' });
		}
	}

	handleChange(event) {
		let title = event.target.value;
		this.setState({ title });
		//console.log('handleChange/title:' + ' event.target.value');
	}

	render() {
		return (
			<form className="note-addform" onSubmit={this.handleSubmit}>
				<input 
					type="text"
					className="note-addform__input"
					value={this.state.title}
					placeholder="Что нужно сделать?"
					onChange={this.handleChange} 
				/>
				<Button className="note-addform__button" type="submit"/>
			</form>
		);
	}
}

Form.propTypes = {
	onAdd: PropTypes.func.isRequired
};

export default Form;