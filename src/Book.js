import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Book = props => {
	const style = {
		width: 128,
		height: 193,
		backgroundImage: props.imageLinks
			? `url(${props.imageLinks.thumbnail})`
			: ''
	};

	return (
		<div className="book">
			<div className="book-top">
				<Link to={`/books/${props.id}`}>
					<div className="book-cover" style={style} />
				</Link>
				<div className="book-shelf-changer">
					<select
						onChange={evt => props.onBookUpdate({ ...props }, evt.target.value)}
						value={props.shelf ? props.shelf : 'none'}
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
				{props.title}
			</div>
			<div className="book-authors">
				{props.authors.map(author =>
					<p key={author}>
						{author}
					</p>
				)}
			</div>
		</div>
	);
};

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
