import React, { useState, useEffect } from 'react';

const BookShelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookshelf.length > 0 ? (
          bookshelf.map((book) => (
            <div key={book.key} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{book.title}</div>
                <p className="text-gray-700 text-base">
                  {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                </p>
                <p className="text-gray-600 text-sm">
                  {book.first_publish_year ? `First published: ${book.first_publish_year}` : 'N/A'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No books in your bookshelf yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookShelf;
