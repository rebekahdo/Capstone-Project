import React from 'react';

const ToRead = ({ toRead }) => {
  return (
    <div className="to-read-section">
      <h3>To Read</h3>
      <div className="to-read-list">  {/* Listing for to-read */}
        {toRead.map((book) => (         /* Maps the 'toRead' array and displays the book */
          <div key={book.id} className="to-read-item">  {/*every book is contained in a div with a unique key based on its id*/}
            <h4>{book.volumeInfo.title}</h4>
            <p>{book.volumeInfo.authors}</p>        {/*displays book information*/}
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ''}
              alt={book.volumeInfo.title}
            />
            {}
          </div>
        ))}
        {toRead.length === 0 && <p>No books marked as To-Read yet!</p>} {/*message displayed when no books present in category*/}
      </div>
    </div>
  );
};

export default ToRead;