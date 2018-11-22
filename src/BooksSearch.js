import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksSearch extends React.Component {

  constructor() {
    super();
    this.state = {
    query: "",
    books: []
    }
  }

  /* 
  	Update the shelf for each book, 
  	none if the book is not on any shelf and 
  	if the id book founds on book shelf 
  	then set the current book shelf
  */
  updateData = (books) => {
    const cBooks = books.map(book => {
      book.shelf = "none";
      this.props.currentBooks.forEach(book2 => {
        if (book.id === book2.id) {
          book.shelf = book2.shelf;
        }
      })
      return book
    })
    this.setState({
      books: cBooks
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        books.length > 0 ? this.updateData(books):this.setState({books:[]})
      }).catch((e)=> {
      console.error(`The API responded with an error: ${e}`);
    })
    }
    else
    {this.setState({books:[]})}
  }

  updateBooks = (book, shelf)=> {
    let current = this.state.books;
    const bookToUpdate = current.filter(cBook => cBook.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: current
    })
    this.props.updateShelf(book, shelf);
  }

  render() {
    return (
      <div className="searchBooks">
        <div className="searchBooksBar">
          <Link to="/" className="closeSearch">
            Close
          </Link>
          <div className="searchBooksInputWrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="searchBooksResults">
          <ol className="bookGrid">
            {this.state.books.filter((book) => (book.imageLinks)).map(book =>
              <li key={book.id} className="book">
                <div className="top">
                  <div
                    className="cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="bookShelfChanger">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBooks(book, e.target.value);
                      }}
                    >
                      <option disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="bookTitle">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="bookAuthors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BooksSearch;