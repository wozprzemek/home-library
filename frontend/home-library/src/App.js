import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import BookCard from './components/BookCard';
import FormWindow from './components/FormWindow';
import Header from './components/Header'
import { Link, Outlet } from "react-router-dom";

// // bookmark color palette
const bookmarkPalette = ['#312F2F','#104547','#7798AB', '#9D6381', '#E2C044', '#0F110C','#BFEDC1'];
// let randomColor = bookmarkPalette[~~(Math.random() * bookmarkPalette.length)];

function App() {
 
  // book data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/')
    .then(response => response.json())
    .then(data => {
      setBooks(data);
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
      toggleAddWindow()
    }
    else{
        alert('Please fill all required (*) fields.')
    }
  };

  const toggleAddWindow = () => {
    setAddWindow(!addWindow)
  }

  const toggleEditWindow = (book_obj) => {
    setEditWindow(!editWindow)
    setSelectedBook(book_obj)
    if (book_obj !== null && !editWindow){
      console.log(document.querySelector("#title"))
      // fill initial input values
      document.querySelector("#title").value = book_obj.title 
      document.querySelector("#release_date").value = book_obj.release_date
      document.querySelector("#first_name").value = book_obj.author.first_name
      document.querySelector("#last_name").value = book_obj.author.last_name
      document.querySelector("#description").value = book_obj.description
    }
  }

  const editBook = () => {
    console.log(selectedBook)
    let pk = selectedBook.id
    let formData = new FormData(document.querySelector("#form"))
    let object = {}
    let book = {}
    let author = {}
    formData.forEach((value, key) => object[key] = value)
    console.log(object)
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
        fetch("http://127.0.0.1:8000/books/edit/" + pk + "/", {
            method: "PUT",
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
      toggleEditWindow()
    }
    else{
        alert('Please fill all required (*) fields.')
    }
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

  // define states
  const [addWindow, setAddWindow] = useState(false);
  const [editWindow, setEditWindow] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  
  // title state for book search
  const [title, setTitle] = useState('');
  
  const handleChange = (e) => {
    setTitle(e.target.value)
  }


  return (
    <>
      {addWindow == true ? <div id='overlay' onClick={toggleAddWindow}></div> : null}
      {addWindow == true ? <FormWindow display="grid" title="Add new entry" onClick={toggleAddWindow} submit={addBook}></FormWindow> : null}

      {editWindow == true ? <div id='overlay' onClick={() => toggleEditWindow(null)}></div> : null}
      {editWindow == true ? <FormWindow display="grid" title="Edit entry" onClick={() => toggleEditWindow(null)} submit={editBook}></FormWindow> : 
      <FormWindow display="none" onClick={() => toggleEditWindow(null)} addBook={addBook} editBook={editBook}></FormWindow>}
      <div id="wrapper">
        <Header highlightColor='#9D6381' title={title} onClick={toggleAddWindow} onChange={handleChange.bind(this)}/>
        <div id="content">
          {books.filter(book => book.title.toLowerCase().includes(title.toLowerCase())).map((book) => (
            <Link to={`/books/${book.id}`} key={book.id}>
              <BookCard editBook={() => toggleEditWindow(book)} deleteBook={() => deleteBook(book.id)} key={book.id} pk={book.id} title={book.title} author={book.author.first_name + ' ' + book.author.last_name} date={new Date(book.release_date).getFullYear()} description={book.description} bookmarkColor={book.color}></BookCard>
            </Link> 
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;