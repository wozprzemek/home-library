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
        setSize([document.body.clientWidth, document.body.clientWidth]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
  // get current window size
  const [width, height] = useWindowSize();

  // calculate card width for current window size
  const calculateCardWidth = (windowWidth) => {
    let n = ~~((windowWidth - 15) / 575);
    let width = (windowWidth - 25 * n - 15) / n;
    return width;
  };

  let cardWidth = calculateCardWidth(width);
 
  // book data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/', {
      headers: {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      }
    })
    .then(response => response.json())
    .then(data => console.log(data.results));
  });  

  const addBook = () => {
    // add a book
    setBooks([...books, {
      id: books.length,
      title: "Book " + books.length,
      author: "Author2",
      date: "2018",
      color: bookmarkPalette[~~(Math.random() * bookmarkPalette.length)],
    }]);
  };
  return (
    <div id="wrapper">
      <Header highlightColor='#9D6381' onClick={addBook}/>
      <div id="content">
        {books.map((book) => (
           <BookCard key={book.id} width={cardWidth} title={book.title} author={book.author} date={book.date} bookmarkColor={book.color}></BookCard>
        ))}
      </div>
    </div>
  );
}

export default App;