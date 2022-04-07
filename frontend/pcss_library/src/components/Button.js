import './Button.css'

const Button = ({onClick,text, width, height, color, backgroundColor}) => {

  return (
    <button onClick={onClick} id="button" style={{width: width, height:height, color:color, backgroundColor:backgroundColor}}>{text}</button>
  )
}

export default Button