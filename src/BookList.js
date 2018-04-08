import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import Shelf from './Shelf';

class BookList extends Component {
	state = {
		books: []
	};

	getBooks = shelfCode =>
		this.state.books.filter(book => book.shelf === shelfCode);

	updateBook = (bookToUpdate, newShelf) => {
		BooksAPI.update(bookToUpdate, newShelf).then(updatedBooks => {
			this.setState(currentState => ({
				books: currentState.books
					.filter(book => book.id !== bookToUpdate.id)
					.concat([{ ...bookToUpdate, shelf: newShelf }])
			}));
		});
	};

	componentDidMount() {
		BooksAPI.getAll().then(books =>
			this.setState(() => ({
				books: books
			}))
		);
	}

	render() {
		const shelves = [
			{
				shelfCode: 'currentlyReading',
				title: 'Currently Reading',
				books: this.getBooks('currentlyReading')
			},
			{
				shelfCode: 'wantToRead',
				title: 'Want to Read',
				books: this.getBooks('wantToRead')
			},
			{
				shelfCode: 'read',
				title: 'Read',
				books: this.getBooks('read')
			}
		];

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<ul>
						{shelves.map(shelf =>
							<li key={shelf.shelfCode}>
								<Shelf
									books={shelf.books}
									title={shelf.title}
									onBookUpdate={this.updateBook}
								/>
							</li>
						)}
					</ul>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default BookList;
