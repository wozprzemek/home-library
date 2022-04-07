import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import BookCard from './components/BookCard';
import FormWindow from './components/FormWindow';
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

 
  // book data
  const [books, setBooks] = useState([]);

  let cardWidth = calculateCardWidth(windowWidth);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/')
    .then(response => response.json())
    .then(data => {
      setBooks(data);
      console.log(data)
      cardWidth = calculateCardWidth(windowWidth);
      console.log('ON MOUNT: ' + cardWidth)
    });
  }, []);  

  const addBook = () => {
    // Add a book
    
    let formData = new FormData(document.querySelector("#form"))
    let object = {}
    let book = {}
    let author = {}
    formData.forEach((value, key) => object[key] = value)
    if (object.title.length !== 0 &&    
        object.release_date.length !== 0 &&
        object.first_name.length !== 0 &&
        object.last_name.length !== 0
    ){
        author.first_name = object.first_name
        author.last_name = object.last_name

        book.title = object.title
        book.release_date = object.release_date
        book.author = author
        if (object.description.length == 0){
          book.description = 'No description'
        }
        else{
          book.description = object.description
        }

        console.log(JSON.stringify(book))
        fetch("http://127.0.0.1:8000/books/add/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }).then(data => {
          console.log(data)
          fetch('http://127.0.0.1:8000/books/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              setBooks(data);
              console.log(data)
          });
      });
      showFormWindow()
    }
    else{
        alert('Please fill all required (*) fields.')
    }
  };

  const showFormWindow = () => {
    setFormWindow(!formWindow)
  }

  const editBook = (book_obj) => {
    console.log(book_obj)
    showFormWindow()

    // fill initial input values
    console.log(book_obj.title)
    console.log(document.querySelector("#title"))
    // document.querySelector("#form").querySelector("#title").value = book_obj.title

    // let formData = new FormData(document.querySelector("#form"))
    // let object = {}
    // let book = {}
    // let author = {}
    // formData.forEach((value, key) => object[key] = value)
    // if (object.title.length !== 0 &&    
    //     object.release_date.length !== 0 &&
    //     object.first_name.length !== 0 &&
    //     object.last_name.length !== 0
    // ){
    //     author.first_name = object.first_name
    //     author.last_name = object.last_name

    //     book.title = object.title
    //     book.release_date = object.release_date
    //     book.author = author
    //     if (object.description.length == 0){
    //       book.description = 'No description'
    //     }
    //     else{
    //       book.description = object.description
    //     }

    //     console.log(JSON.stringify(book))
    //     fetch("http://127.0.0.1:8000/books/add/", {
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(book)
    //     }).then(data => {
    //       console.log(data)
    //       fetch('http://127.0.0.1:8000/books/', {
    //         method: 'GET',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         }
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //           setBooks(data);
    //           console.log(data)
    //       });
    //   });
    //   showFormWindow()
    // }
    // else{
    //     alert('Please fill all required (*) fields.')
    // }
  };

  const deleteBook = (pk) => {
    console.log(pk)
    fetch('http://127.0.0.1:8000/books/delete/' + pk, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        console.log(data)
        fetch('http://127.0.0.1:8000/books/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setBooks(data);
            console.log(data)
        });
    });
  };

  const [formWindow, setFormWindow] = useState(false);
  return (
    <>
      {formWindow == true ? <div id='overlay' onClick={showFormWindow}></div> : null}
      {formWindow == true ? <FormWindow onClick={showFormWindow} addBook={addBook} editBook={editBook}></FormWindow> : null}
      <div id="wrapper">
        <Header highlightColor='#9D6381' onClick={showFormWindow}/>
        <div id="content">
          {books.map((book) => (
            <BookCard editBook={() => editBook(book)} deleteBook={() => deleteBook(book.id)} key={book.id} pk={book.id} width={cardWidth} title={book.title} author={book.author.first_name + ' ' + book.author.last_name} date={new Date(book.release_date).getFullYear()} description={book.description} bookmarkColor={book.color}></BookCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;