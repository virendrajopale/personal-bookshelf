import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";


const BookSearch = () => {
  const [input, setInput] = useState('');
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false)
  const fetchData = async (inp) => {
    
    try {
      if (inp?.length > 2) {
        setLoading(true)
        const response = await fetch(`https://openlibrary.org/search.json?q=${inp}&limit=10&page=1`);
        
        const res = await response.json();
        console.log(res);
        if (res.docs.length <= 0) {
            setLoading(false)
          throw new Error('Book not found');
        }
        setBookData(res.docs);
        setLoading(false)
        setError('');
      } else {
          setBookData([]);
        setLoading(false)
        setError('');
      }
    } catch (err) {
      setBookData([]);
      setLoading(false)
      setError(err.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(input);
    }, 600);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const handleInputChange = (e) => {
    e.preventDefault()
    setInput(e.target.value);
  };

  const addToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf = [...bookshelf, book];
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  };

  return (
    <div className="container mx-auto p-4">
      
     
          <input
            type="text"
            value={input}
            autoFocus
            onChange={handleInputChange}
            placeholder="Search Book here.."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
       <Link to="/bookshelf" className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Go to My Bookshelf
      </Link>
      <div className='flex justify-center mt-3'>

        {loading?<ClockLoader  color="#36d7b7" />:""}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        {bookData && bookData.map((book) => (
          <div key={book.key} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{book.title}</div>
              <p className="text-gray-700 text-base">
                {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
              </p>
              <p className="text-gray-600 text-sm">
                {book.first_publish_year ? `First published: ${book.first_publish_year}` : 'N/A'}
              </p>
              <button
                onClick={() => addToBookshelf(book)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Add to Bookshelf
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default BookSearch;
