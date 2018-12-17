import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import notes from './notes';
import Header from './components/Header';
import Note from './components/Note';
import Form from './components/Form'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: this.props.initialData
		};

		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount() {
		let localNotes = JSON.parse(localStorage.getItem('notes'));
		if (localNotes) {this.setState({ notes: localNotes })};
	}

	updateLocalStorage() {
		let notes = JSON.stringify(this.state.notes);
		localStorage.setItem('notes', notes);
	}

	handleStatusChange(id) {
		let notes = this.state.notes.map(note => {
			if (note.id === id) {
				note.completed = !note.completed;
			}

			return note;
		});
		this.setState({ notes }, this.updateLocalStorage);
	}

	handleAdd(title) {
		let note = {
			id: Math.random(),
			title,
			completed: false
		};

		let notes = [...this.state.notes, note];

		this.setState({ notes }, this.updateLocalStorage);
	}

	handleDelete(id) {
		let notes = this.state.notes.filter(note => note.id !== id);

		this.setState({ notes}, this.updateLocalStorage);
	}

	handleEdit(id, title) {
		let notes = this.state.notes.map(note => {
			if (note.id === id) {
				note.title = title;
			}

			return note;
		});

		this.setState({ notes }, this.updateLocalStorage);
	}

	render(){
		return (
			<section className="container">
				<Header title={this.props.title} notes={this.state.notes}/>
				<div className="notes-list">
					{this.state.notes.map(note => 
						<Note 
							key={note.id}
							id={note.id} 
							title={note.title} 
							completed={note.completed}
							onStatusChange={this.handleStatusChange}
							onDelete={this.handleDelete}
							onEdit={this.handleEdit}
						/>)
					}
				</div>
				<Form onAdd={this.handleAdd}/>
			</section>
		);
	}
	
}

App.propTypes = {
	title: PropTypes.string,
	initialData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	})).isRequired
};

App.defaultProps = {
	title: 'NOTElist'
};

ReactDOM.render(
  <App initialData={notes}/>,
  document.getElementById('app')
);