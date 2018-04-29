import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import * as BooksAPI from './utils/BooksAPI';

class BookSearch extends Component {
	state = {
		booksOnShelf: [],
		booksReturned: []
	};

	onQueryChange = evt => {
		const query = evt.target.value;
		if (query.length > 0) {
			BooksAPI.search(evt.target.value).then(searchRet => {
				this.setState(() => ({
					booksReturned: searchRet instanceof Array ? searchRet : []
				}));
			});
		} else {
			this.setState(() => ({
				booksReturned: [],
				booksOnShelf: []
			}));
		}
	};

	/*
		Sync the shelf status from books on shelves for all books returned from the search
	*/
	syncBookShelf = () => {
		this.state.booksReturned.forEach(book => {
			const bookOnShelf = this.state.booksOnShelf.filter(b => b.id === book.id);
			if (bookOnShelf.length > 0) {
				book.shelf = bookOnShelf[0].shelf;
			}
		});
	};

	updateBook = (bookToUpdate, newShelf) => {
		BooksAPI.update(bookToUpdate, newShelf).then(updatedBooks => {
			this.setState(currentState => ({
				booksOnShelf: currentState.booksOnShelf
					.filter(book => book.id !== bookToUpdate.id)
					.concat([{ ...bookToUpdate, shelf: newShelf }])
			}));
		});
	};

	componentDidMount() {
		BooksAPI.getAll().then(books =>
			this.setState(() => ({
				booksOnShelf: books
			}))
		);
	}

	render() {
		this.syncBookShelf();
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={this.onQueryChange}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<Shelf
						books={this.state.booksReturned}
						title={''}
						onBookUpdate={this.updateBook}
					/>
				</div>
			</div>
		);
	}
}
export default BookSearch;
