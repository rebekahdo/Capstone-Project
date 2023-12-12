import React, { useState, useEffect } from 'react';
import './App.css';
import BookDetails from './BookDetails';
import logoImage from './logo.jpg';
import Completed from './Completed';
import ToRead from './ToRead';
import NoteSection from './NoteSection';

const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showHomePage, setShowHomePage] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(20); // Initial number of results per page = 20
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [toRead, setToRead] = useState([]);
  const [notification, setNotification] = useState({ message: '', visible: false });
  //state declarations above

  //loads favorites from storage with render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const searchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, ...(data.items || [])]);
      setShowHomePage(false);
  } catch (error) {
    console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (startIndex > 0) {
      searchBooks();
    }
    
  }, [startIndex]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      // If the search query is empty or only contains spaces, do not proceed with the search
      return;
    }
    setBooks([]); // Clear existing books on new search
    setStartIndex(0);
    searchBooks();
  };

  const handleToRead = (book) => {
    setToRead([...toRead, book]);
    showNotification(`Added "${book.volumeInfo.title}" to To-Read!`); //notif when book gets added to to-read
  };

  const handleLoadMore = () => {
    setStartIndex(startIndex + maxResults); // startIndex gets increased so that more books can load
  };

  const toggleCompletion = (book) => {
    const isCompleted = completed.some((completedBook) => completedBook.id === book.id); //allows for book to be declared completed if added or removed

    if (isCompleted) {

      const updatedCompleted = completed.filter((completedBook) => completedBook.id !== book.id); //book gets removed from list and localStorage updates
      setCompleted(updatedCompleted);
      localStorage.setItem('completed', JSON.stringify(updatedCompleted));
    } else {
      const updatedCompleted = [...completed, book]; //book gets added to list 'complete', and displays notification
      setCompleted(updatedCompleted);
      localStorage.setItem('completed', JSON.stringify(updatedCompleted));
      showNotification('Book added to Complete!');
    }
  };
  const toggleFavorite = (book) => { //determines book status as favorite or not
    const isFavorite = favorites.some((fav) => fav.id === book.id); // checks if book is a favorite

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== book.id); //if book is already an existing favorite, it gets removed
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, book]; //if not a favorite, it gets added into category
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  useEffect(() => { //localStorage gets updated when the favorites get edited
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = () => {
    toggleFavorite(selectedBook);
    setNotification({ message: 'Book added to Favorites!', visible: true }); //notif display for adding book
  };

  const handleBookClick = (book) => { // function for clicking book item handle
    setSelectedBook(book);
    setShowDetails(true);
  };

  const handleCloseDetails = () => { // function for closing book details
    setShowDetails(false);
    setSelectedBook(null);
  };

  const handleRemoveFavorite = (bookId) => { //function to remove favorite category
    const updatedFavorites = favorites.filter((fav) => fav.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setNotification({ message: 'Book removed from Favorite!', visible: true });
  };

  const handleRemoveCompleted = (bookId) => { //function for removing completed book from category
    const updatedCompleted = completed.filter((completedBook) => completedBook.id !== bookId);
    setCompleted(updatedCompleted);
    localStorage.setItem('completed', JSON.stringify(updatedCompleted));
    setNotification({ message: 'Book removed from completed!', visible: true });
  };
  const handleRemoveToRead = (bookId) => { //function for removing to-read book from category
    const updatedToRead = toRead.filter((item) => item.id !== bookId);
    setToRead(updatedToRead);
    localStorage.setItem('toRead', JSON.stringify(updatedToRead));
    setNotification({ message: 'Book removed from To-Read!', visible: true });
  };

  const handleReturnHome = () => { //function which allows for user to return home
    setShowDetails(false);
    setSelectedBook(null);
    setShowHomePage(true);
  };

  const showNotification = (message) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification({ message: '', visible: false });
    }, 2000); // Hides notif after 2 seconds
  };

  const hideNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  //allows for rendering of properties
  return (
    <div className="App">
      <div className="header">
      <a href="/" onClick={handleReturnHome}>
      <img src={logoImage} alt="Logo" className="header-logo" />
      </a>
        <h1>BookLooks</h1>
      </div>    
      <div className="content"> {/*rendering for homepage*/}
      {notification.visible && <div className="notification">{notification.message}</div>} {/*notif popup */}
        {showHomePage ? (     //the functionality for searching, favorites, completed, to-read, etc gets rendered
          <div className="home-page">
            <h2>Welcome to BookLooks</h2>
            <p>Search for books to get started!</p>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button"> {/*search button implementation*/}
                Search
                </button>
            </form> 
            <div className="favorites-tab"> {/*favorites tab */}
              <h3>Favorites</h3>
              {notification.visible && <div className="notification">{notification.message}</div>}
              <div className="favorites-list"> {/* maps and displays favorites */}
                {favorites.map((book) => (
                  <div key={book.id} className="favorite-item">
                    <h4>{book.volumeInfo.title}</h4>
                    <p>{book.volumeInfo.authors}</p>
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail || ''}
                      alt={book.volumeInfo.title}
                    />
                    <button
                    className="green-button"
                    onClick={() => handleRemoveFavorite(book.id)} //button for removal
                    >Remove </button>
                  </div>
                ))}
                {favorites.length === 0 && <p className="no-favorites">No favorites yet!</p>} {/*if no favorites present in box*/}
              </div>
            </div>
            <div className="completed-tab">
              <h3>Completed</h3>
              {notification.visible && <div className="notification">{notification.message}</div>}
            <div className="completed-list"> {/*maps and displays books marked as completed */}
              {completed.map((book) => (
              <div key={book.id} className="completed-item">
            <h4>{book.volumeInfo.title}</h4>
            <p>{book.volumeInfo.authors}</p>
            <img
          src={book.volumeInfo.imageLinks?.thumbnail || ''}
          alt={book.volumeInfo.title}
        />
        <button 
        className="green-button"
        onClick={() => handleRemoveCompleted(book.id)} //removal process of book in category
        >Remove</button>
      </div>
    ))}
    {completed.length === 0 && <p className="no-completed">No completed books yet!</p>} {/*if no completed books present in box*/}
    </div>
    </div>
    <div className="to-read-tab">
      <h3>To-Read</h3>
      <div className="to-read-list">  {/* maps through and displays books with to-read */}
        {toRead.map((book) => (
      <div key={book.id} className="to-read-item">
        <h4>{book.volumeInfo.title}</h4>
        <p>{book.volumeInfo.authors}</p>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || ''}
          alt={book.volumeInfo.title}
        />
         <button
            className="green-button"
              onClick={() => handleRemoveToRead(book.id)} // Trigger function to remove book
          >
          Remove
          </button>
        {}
      </div>
       ))}
        {toRead.length === 0 && <p className="no-to-read">No books in To-Read yet!</p>} {/*if no completed books to-read in box*/}
         </div>
          </div>
          <NoteSection bookId={selectedBook ? selectedBook.id : null} /> {/*displays note taking section on frontpage*/}
          </div>
        ) : (
          <div className="book-list"> {/* maps through list and displays book */}
            {books.map((book) => (
              <div key={book.id} onClick={() => handleBookClick(book)} className="book-item">
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors}</p>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || ''} /*book information */
                  alt={book.volumeInfo.title}
                />
              </div>
            ))}
            {books.length > 0 && (
              <button className="load-more-btn" onClick={handleLoadMore}> {/* button action for loading more books into page */}
                Load More
              </button>
            )}
            {showDetails && selectedBook && (  /* Render BookDetails if showDetails and SelectedBook = true */
              <BookDetails
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
                handleToRead={handleToRead}
                onReturnHome={() => {
                  setSelectedBook(null);
                  setShowHomePage(true);
                  <ToRead toRead={toRead} />
              }}
                onFavorite={handleFavorite}
                toggleCompletion={toggleCompletion}
              />
            )}
          </div>
        )}
    </div>
      <div className="about-section">
        <div className="about-box">
          <h2>About BookLooks</h2>
          <p>
            With the creation of BookLooks, this is designed with avid readers in mind. 
            We aim to give users the opportunity to keep track of everything book related! This is your personal book logging experience! You can sort and organize your books, search and scout out new additions to add to your collection, check detailed descriptions and author information, personal rating system and more to be developed as BookLooks develops!. </p>
            <p>
              This is still early access as development will continue. However, if you have any questions or concerns, feel free to reach out to one of us!</p>
              <div className="person-info">
                <h3>Joey Devito</h3>
                <p>Email: josephmdevito@lewisu.edu</p>
            </div>
            <div className="person-info">
              <h3>Rebekah Downer</h3>
              <p>Email: rebekahdowner@lewisu.edu</p>
            </div>
            <div className="person-info">
              <h3>Ian Scroggs</h3>
              <p>Email: iandscroggs@lewisu.edu</p>
            </div>
          </div>
        </div>
      </div>
  );
};
export default App;