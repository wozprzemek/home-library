import './Button.css'

const Button = ({onClick,text, width, height, color, backgroundColor, border}) => {

  return (
    <button onClick={onClick} id="button" style={{width: width, height:height, color:color, backgroundColor:backgroundColor, border: border}}>{text}</button>
  )
}

export default Button