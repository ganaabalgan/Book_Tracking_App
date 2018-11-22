import React from "react";

class BooksShelf extends React.Component {
  state = {};

  render() {
    return (
      <div className="BooksShelf">
        <h2 className="booksShelfTitle">
          {this.props.shelfTitle}
        </h2>
        <div className="booksShelfBooks">
          <ol className="bookGrid">
            {this.props.books.filter((book)=>(book.imageLinks)).map(book =>
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
                    <select value={book.shelf} onChange={event => this.props.updateShelf(book.id, event)}>
                      <option value="none" disabled>
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
                <div className="bookAuthors">
                  {book.authors &&
                    <div className="bookAuthors">
                      {book.authors[0]}
                    </div>}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BooksShelf;