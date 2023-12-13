import React from 'react';
//For completed books
const Completed = ({ completed, handleRemoveCompleted }) => {
    return (
      <div className="completed-tab">
        <h3>Completed</h3>
        <div className="completed-list">
          {completed.map((book) => (                        /* Maps through each book labeled completed */
            <div key={book.id} className="completed-item">
              <h4>{book.volumeInfo.title}</h4>              {/* Book title, author, cover image */}
              <p>{book.volumeInfo.authors}</p>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || ''}
                alt={book.volumeInfo.title}
              />
              <button
                className="completed-remove-button" 
                onClick={() => handleRemoveCompleted(book.id)}   /* Button for removing completed books */
              >
                Remove
              </button>
            </div>
          ))}
          {completed.length === 0 && <p>No completed books yet!</p>} {/* when category is blank */}
        </div>
      </div>
    );
  };

export default Completed;