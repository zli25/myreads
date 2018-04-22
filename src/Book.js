import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Book extends Component {
	render() {
		// const book = this.props.book;

		return (
			<div className="book">
				<div className="book-top">
					<Link to={`/books/${this.props.id}`}>
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: this.props.imageLinks
									? `url(${this.props.imageLinks.thumbnail})`
									: ''
							}}
						/>
					</Link>
					<div className="book-shelf-changer">
						<select
							onChange={evt =>
								this.props.onBookUpdate({ ...this.props }, evt.target.value)}
							value={this.props.shelf ? this.props.shelf : 'none'}
						>
							<option value="" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">
					{this.props.title}
				</div>
				<div className="book-authors">
					{this.props.authors.map(author =>
						<p key={author}>
							{author}
						</p>
					)}
				</div>
			</div>
		);
	}
}

Book.propTypes = {
	title: PropTypes.string,
	authors: PropTypes.array,
	onBookUpdate: PropTypes.func
};

Book.defaultProps = {
	authors: [],
	onBookUpdate: () => {}
};

export default Book;
