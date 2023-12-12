import React, { useState, useEffect } from 'react';
// NoteSection is able to have noted depending on book id
const NoteSection = ({ bookId }) => {
  const [note, setNote] = useState('');

  // load note for the book from localStorage 
  useEffect(() => {
    const savedNote = localStorage.getItem(`bookNote_${bookId}`); //retrieves note for that book depending on id
    if (savedNote) {
      setNote(savedNote); //if there is a note, the state will be assigned with what got saved
    }
  }, [bookId]);

  // note gets saved to local storage when changed
  useEffect(() => {
    localStorage.setItem(`bookNote_${bookId}`, note); //stores note in localstorage via kia based on book id
  }, [bookId, note]);

  return (
    <div className="note-section">
      <h3>Notes</h3>
      <textarea
        value={note} //note is assinged these properties
        onChange={(e) => setNote(e.target.value)}
        placeholder="Take notes here..."
        rows={6}
        cols={50}
      />
    </div>
  );
};

export default NoteSection;