
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
  // to change later based on how the book display should look
  console.log('Title:', title);
  console.log('Author:', author);
  console.log('Description:', description);
  console.log('Thumbnail:', thumbnail);

// Example usage:
// searchBooks('JavaScript'); 