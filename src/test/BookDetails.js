import React, { useState, useEffect } from 'react';

const BookDetails = ({ book, onClose, onReturnHome, onFavorite, toggleCompletion, handleToRead }) => {
  const [rating, setRating] = useState(null); // manages rating state for book
  const [note, setNote] = useState('');  // manages note state for book

  // Function which can allow change in note
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  //function for saving note
  const saveNote = () => {
    console.log('Note for book:', book.volumeInfo.title, '-', note);
    setNote('');
  };
  // loads stored rating from local storage
  useEffect(() => {
    const storedRating = localStorage.getItem(`book-${book.id}-rating`);
    if (storedRating !== null) {
      setRating(parseInt(storedRating));
    }
  }, [book.id]);
// Function to handle setting the rating for the book
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    localStorage.setItem(`book-${book.id}-rating`, selectedRating);
  };
 // handle adding the book to 'To-Read'
  const handleToReadClick = () => {
    handleToRead(book);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-btn">
          Close
        </button>
        <button onClick={onReturnHome} className="modal-btn">
          Return Home
        </button>
        <button onClick={onFavorite} className="modal-btn">
          Favorite
        </button>
        <button onClick={() => toggleCompletion(book)} className="modal-btn">
          Complete
        </button>
        {}
        <button onClick={handleToReadClick} className="modal-btn">
          To-Read
        </button>
        {/* Book details get displayed once selected */}
        <h2>{book.volumeInfo.title}</h2>
        <p>Author: {book.volumeInfo.authors}</p>
        <p>ISBN: {book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0].identifier}</p>
        <p>Publish Date: {book.volumeInfo.publishedDate}</p>
        <p>{book.volumeInfo.description}</p>
        <div>
          <p>Rate this book!:</p>       {/* Rating implementation: renders a section to rate the book via stars */}
          {[1, 2, 3, 4, 5].map((option) => (
            <button
              key={option}
              onClick={() => handleRating(option)}
              style={{
                fontSize: '24px',
                color: rating >= option ? 'gold' : 'gray',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              &#9733;
              {option}
            </button>
          ))}
        </div>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || ''} /* Shows front cover */
          alt={book.volumeInfo.title}/>
          {/* User input for note-taking */}
        <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Add note..."
        rows={4}
        cols={50}
      />
      <button className="save-note-button" onClick={saveNote}>Save Note</button>
      </div>
    </div>
  );
};

export default BookDetails;