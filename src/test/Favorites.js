import React, { useState, useEffect } from 'react';
import BookDetails from './BookDetails';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); //for storing favorite books
  const [selectedBook, setSelectedBook] = useState(null); // book that is selected
  const [showDetails, setShowDetails] = useState(false); // for displaying bookdetails popup

  //Favorites wil be loaded from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  //actual interactive process of displaying books via click
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowDetails(true);
  };
//closing the modal/popup
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBook(null);
  };

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      <div className="favorites-list"> {/* List dedicated for favorite books */}
        {favorites.map((book) => (
          <div key={book.id} onClick={() => handleBookClick(book)} className="favorite-item">
            <h4>{book.volumeInfo.title}</h4>
            <p>{book.volumeInfo.authors}</p>  {/* Displays information accordingly for book in its category on homepage, such as author, title, etc */}
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ''}
              alt={book.volumeInfo.title}
            />
          </div>
        ))}
        {favorites.length === 0 && <p>No favorites yet!</p>} {/* messsage displayed under favorites category when no book is present */}
      </div>
      {showDetails && selectedBook && (     /* bookdetails modal/popup when selecting book*/
        <BookDetails
          book={selectedBook}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};