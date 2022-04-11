import React from 'react'
import './Form.css';

const Form = (props) => {
    const [title, setChoreDesc] = useState();
    const [name, setName] = useState();
    const [date, setDate] = useState();

    const handleSubmit= (e) => {
      addChoreLog([choreDesc, name, date])
      e.preventDefault();
    }

    return (
        <div>Form</div>
    )
}

export default Form