import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import './BookDetails.css'

const BookDetails = (props) => {

  // book id
  let { bookId } = useParams();
  console.log('params: ' + bookId)

  // book data
  const [book, setBook] = useState({
    // "title": null,
    // "author": {
    //   "first_name": null,
    //   "last_name": null,
    // },
    // "release_date": null,
    // "description": null
  });

  // fetch lock
  const [isLoaded, setLoaded] = useState(false)

  // fetch book data on load
  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/' + bookId)
    .then(response => response.json())
    .then(data => {
      setBook(data)
      setLoaded(true)
    });
  }, []);  
  return (
    <div id="book-details-wrapper">
        {isLoaded ?
        <div id="book-details-container">
          <h1 id="book-details-title">{book.title}</h1>
          <h1 id="book-details-author">{book.author.first_name + " " + book.author.last_name}</h1>
          <h1 id="book-details-date">{new Date(book.release_date).getFullYear()}</h1>
          <hr id="hr"></hr>
          <h1 id="book-details-description">{book.description}</h1>
        </div>
        : null
      }
      
    </div>
  )
}

export default BookDetails