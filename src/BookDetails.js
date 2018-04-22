import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import * as BooksAPI from './utils/BooksAPI';

class BookDetails extends Component {
	state = {
		book: null
	};

	updateBook = (bookToUpdate, newShelf) => {
		BooksAPI.update(bookToUpdate, newShelf).then(updatedBooks => {
			this.setState(currentState => ({
				book: { ...bookToUpdate, shelf: newShelf }
			}));
		});
	};

	componentDidMount() {
		console.log(this.props.match.params.id);
		BooksAPI.get(this.props.match.params.id).then(book =>
			this.setState(() => ({
				book: book
			}))
		);
	}

	render() {
		return this.state.book
			? <div>
					<Header />
					<div className="container">
						<div className="book-detail">
							<div className="book-title">
								<h2>
									{this.state.book.title}
								</h2>
							</div>

							<div className="book-authors">
								By
								{this.state.book.authors.map((author, idx) =>
									<span key={author}>
										{author}{' '}
										{idx === this.state.book.authors.length - 1 ? '' : ','}
									</span>
								)}
							</div>
							<div
								className="book-cover"
								style={{
									width: 256,
									height: 386,
									backgroundSize: 'contain',
									backgroundImage: this.state.book.imageLinks
										? `url(${this.state.book.imageLinks.thumbnail})`
										: ''
								}}
							/>
							<div className="book-info">
								<table className="table table-bordered table-hover">
									<tbody>
										<tr>
											<th>
												<strong>Description:</strong>
											</th>
											<th>
												{this.state.book.description}
											</th>
										</tr>

										<tr>
											<th>
												<strong>Shelf:</strong>
											</th>
											<th>
												<div className="book-shelf-changer">
													<select
														onChange={evt =>
															this.updateBook(
																this.state.book,
																evt.target.value
															)}
														value={
															this.state.book.shelf
																? this.state.book.shelf
																: 'none'
														}
													>
														<option value="" disabled>
															Move to...
														</option>
														<option value="currentlyReading">
															Currently Reading
														</option>
														<option value="wantToRead">Want to Read</option>
														<option value="read">Read</option>
														<option value="none">None</option>
													</select>
												</div>
											</th>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			: <div />;
	}
}

export default BookDetails;
