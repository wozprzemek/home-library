import Button from './Button';
import './Header.css';
import { Link, Outlet } from "react-router-dom";

const Header = ({title, onClick, onChange}) => {

  return (
    <div id="container">
        <Link to={`/`}>
          <h1 id="app-title"><i>Home Book Library</i></h1>
        </Link>
        <input id="search-bar" value = {title} onChange={onChange} name="title" placeholder='Filter by title'></input>
        <Button onClick={onClick} text="Add a Book"></Button>
    </div>
  )
}

export default Header