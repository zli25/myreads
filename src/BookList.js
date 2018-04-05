import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import Shelf from './Shelf';

class BookList extends Component {
	state = {
		books: []
	};

	getBooks = shelfCode =>
		this.state.books.filter(book => book.shelf === shelfCode);

	updateBook = (bookToUpdate, newSelf) => {
		BooksAPI.update(bookToUpdate, newSelf).then(updatedBooks => {
			this.setState(currentState => ({
				books: currentState.books
					.filter(book => book.id !== bookToUpdate.id)
					.concat([{ ...bookToUpdate, shelf: newSelf }])
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
			<div className="book-selfves">
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
		);
	}
}

export default BookList;
