import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksSearch from "./BooksSearch";
import BooksList from "./BooksList";
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [] //To track books
  };

  // Retrieving all books
  componentDidMount() {
    this.updateData()
  }

  // Updates shelf
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData()
    })
  }
  // Updates book state
  updateData = () => {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      })
    });    
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksList currentBooks={this.state.books} />} />
        <Route
        path="/Add_a_book"
        render={() =>
        <BooksSearch updateShelf={this.updateShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp