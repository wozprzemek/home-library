import Button from './Button';
import './Header.css';

const Header = ({highlightColor, onClick}) => {
  return (
    <div id="container">
        <h1 id="app-title"><i>Home Book Library</i></h1>
        <input id="search-bar" placeholder='Filter by title'></input>
        
        <Button onClick={onClick} text="Add a Book"></Button>
    </div>
  )
}

export default Header