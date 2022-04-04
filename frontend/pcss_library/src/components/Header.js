import './Header.css';

const Header = ({highlightColor, onClick}) => {
  return (
    <div id="container">
        <h1 id="title"><i>Home Book Library</i></h1>
        <input id="search-bar" placeholder='Filter by title'></input>
        <button id="add-button" onClick={onClick}>Add a Book</button>
    </div>
  )
}

export default Header