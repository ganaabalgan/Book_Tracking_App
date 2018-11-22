import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BooksShelf from "./BooksShelf";


class BooksList extends React.Component {
  state = {};

  //To filter the books depending on a shelf
  updateShelf = (bookId, event) => {
    //get the book on shelf from app
    let currentBooks = this.props.currentBooks;
    const book = currentBooks.filter(book => book.id === bookId)[0];
    book.shelf = event.target.value;
    BooksAPI.update(book, event.target.value).then(response => {
      this.setState({
        books: currentBooks
      });
    });
  };

  render() {
    return (
      <div className="listBooks">
        <div className="listBooksTitle">
          <h1>MyReads</h1>
        </div>
        <div className="listBooksContent">
        {/*Display the three different shelves in main pages with its current books*/}
          <BooksShelf
            key="currently"
            books={this.props.currentBooks.filter(book => book.shelf === "currentlyReading")}
            updateShelf={this.updateShelf}
            shelfTitle="Currently Reading"
          />
          <BooksShelf
            key="wantToRead"
            books={this.props.currentBooks.filter(book => book.shelf === "wantToRead")}
            updateShelf={this.updateShelf}
            shelfTitle="Want to Read"
          />
          <BooksShelf
            key="read"
            books={this.props.currentBooks.filter(book => book.shelf === "read")}
            updateShelf={this.updateShelf}
            shelfTitle="Read"
          />
        </div>
        <div className="openSearch">
          <Link to="/Add_a_book">Add a book</Link>
        </div>
      </div>
    );
  }
}
export default BooksList;