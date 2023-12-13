
// Function to search for books based on a query
function searchBooks(query) {
  const apiKey = 'AIzaSyDQpRAnXAwA9xn0LbCUPpqPC-JAmEop89A'; // api key

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

  // Make a GET request to the Google Books API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check if there are items (books) in the response
      if (data.items && data.items.length > 0) {
        // Iterate over each book item
        data.items.forEach(book => {
          // Extract relevant information from the book item
          const title = book.volumeInfo.title;
          const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
          const description = book.volumeInfo.description || 'No description available';
          const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null;

          // Perform actions with the extracted information
          displayBook(title, author, description, thumbnail);
        });
      } else {
        // Handle the case where no books were found
        console.log('No books found for the given query.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Handle errors
      console.error('Error fetching data:', error.message);
      // add a display error message to user later on
    });
}

// Function to display book information on the webpage
function displayBook(title, author, description, thumbnail) {
// Get the container where you want to display books
  const bookContainer = document.getElementById('bookList');

  // Create a div element for the book card
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  // Create an image element for the book cover
  const bookImage = document.createElement('img');
  bookImage.src = thumbnail || '../assets/placeholder.png'; // Use a placeholder image if thumbnail is not available
  bookImage.alt = title;

  // Create a div for the book details (title and author)
  const bookDetails = document.createElement('div');
  bookDetails.classList.add('book-details');

  const bookTitle = document.createElement('h4');
  bookTitle.innerText = title || 'Unknown Title'; // Use placeholder text if title is not available

  // Create a paragraph element for the author
  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = author || 'Unknown Author'; // Use placeholder text if author is not available

  // Create a div for the book description
  const bookDescription = document.createElement('div');
  bookDescription.classList.add('book-description');
  bookDescription.innerText = description || 'No description available'; // Use placeholder text if description is not available

  // Append elements to the book details
  bookDetails.appendChild(bookTitle);
  bookDetails.appendChild(bookAuthor);

  // Append elements to the book car
  bookCard.appendChild(bookImage);
  bookCard.appendChild(bookDetails);
  bookCard.appendChild(bookDescription)

  // Append the book card to the book container
  bookContainer.appendChild(bookCard);

  bookImage.addEventListener('click', function () {
    bookDescription.style.display = (bookDescription.style.display === 'block') ? 'none' : 'block';
  });
}

// Example usage:
// searchBooks('JavaScript'); 