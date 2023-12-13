import BookDetails from '../view/BookDetails';

document.addEventListener('DOMContentLoaded', function () {
    // Code to run after the DOM is fully loaded
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalVisible, setModalVisibility] = useState(false);
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            // Code to execute when the search button is clicked
            performSearch();
        });
    }

    function performSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value;

        // Perform actions based on the search term
        console.log('Search term:', searchTerm);
    }

    // Add more event listeners and functions as needed
    // Render the BookDetails component conditionally
    if (isModalVisible) {
        const modalContainer = document.getElementById('modalContainer');
        ReactDOM.render(
            <BookDetails
                book={selectedBook}
                onClose={() => setModalVisibility(false)}
                // Add other props as needed
            />,
            modalContainer
        );
    }
    const closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function () {
            // Code to execute when the modal close button is clicked
            closeModal();
        });
    }

    // Function to close the modal
    function closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modal');

        // Hide the modal and overlay
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
    }

    // Add more event listeners and functions as needed
});