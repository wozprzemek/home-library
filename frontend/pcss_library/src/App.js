import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import BookCard from './components/BookCard';
import Header from './components/Header'

// // bookmark color palette
const bookmarkPalette = ['#312F2F','#104547','#7798AB', '#9D6381', '#E2C044', '#0F110C','#BFEDC1'];
// let randomColor = bookmarkPalette[~~(Math.random() * bookmarkPalette.length)];

function App() {
  // get window size dynamically
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([document.body.clientWidth, document.body.clientHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
  // get current window size
  const [windowWidth, windowHeight] = useWindowSize();

  // calculate card width for current window size
  const calculateCardWidth = (windowWidth) => {
    let n = ~~((windowWidth - 15) / 575);
    let width = (windowWidth - 25 * n - 15) / n;
    console.log(windowWidth,n,width)
    return width;
  };

  let cardWidth = calculateCardWidth(windowWidth);
 
  // book data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/')
    .then(response => response.json())
    .then(data => {
      setBooks(data);
      console.log(data)
    });
  }, []);  

  const addBook = () => {
    // Add a book
    let book = {
      id: books.length,
      title: "Book " + books.length,
      author: {
        first_name: "Krzysztof",
        id: 1,
        last_name: "Bucholc"
      },
      date: "2018-01-01",
      description: "Description"
    }

    console.log(book)
    console.log(JSON.stringify(book))
    fetch('http://127.0.0.1:8000/books/add/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
      setBooks(data);
      fetch('http://127.0.0.1:8000/books/')
      .then(response => response.json())
      .then(data => setBooks(data));
    });
  };

  const addAuthor = () => {
    // Add an author
    let author = {
        first_name: "new",
        last_name: "new"
    }

    console.log(author)
    console.log(JSON.stringify(author))
    fetch('http://127.0.0.1:8000/authors/add/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(author)
    })
    .then(response => response.json())

  };
  
  return (
    <div id="wrapper">
      <Header highlightColor='#9D6381' onClick={addAuthor}/>
      <div id="content">
        {books.map((book) => (
           <BookCard key={book.title} width={cardWidth} title={book.title} author={book.author.first_name + ' ' + book.author.last_name} date={new Date(book.release_date).getFullYear()} bookmarkColor={book.color}></BookCard>
        ))}
      </div>
    </div>
  );
}

export default App;