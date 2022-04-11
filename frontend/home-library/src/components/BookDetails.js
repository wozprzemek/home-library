import './BookCard.css'
import edit_icon from '../assets/edit.png'
import delete_icon from '../assets/delete.png'
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const BookCard = ({height, editBook, deleteBook, pk, width, title, author, date, bookmarkColor, description}) => {
  let params = useParams();
  return (
    
      <div id="bookcard-container" style={{width: width, height: height}}>
        <div id="options-container">
          <div>
            <img src={edit_icon} onClick={editBook} alt="edit_icon" id="icon" />
          </div>
          <div>
            <img src={delete_icon} onClick={deleteBook} alt="delete_icon" id="icon" />
          </div>
        </div>
          <div id="bookcard-bookmark" style={{backgroundColor: bookmarkColor}}></div>
          <div id="bookcard-content">
              <div id="bookcard-content-info">
                  <h1 id="bookcard-title">{title}</h1>
                  <h2 id="bookcard-author" style={{color: bookmarkColor}}>{author}</h2>
                  <h3 id="bookcard-date">{date}</h3>
                  <hr></hr>
              </div>
              <div id="bookcard-description">
                {description}
              </div>
          </div>
      </div>
  )
}

export default BookCard