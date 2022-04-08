import React from 'react'
import Button from './Button'
import './FormWindow.css'

const FormWindow = (props) => {

    return (
    <div id="form-window-container" style={{display:props.display}}>
        <div id="form-window-title">{props.title}</div>
        <form id="form">
            <label htmlFor="title">Title*</label>
            <br/>
            <input id="title" name="title" type="text" placeholder='Enter the title'></input>
            <br/>

            <label htmlFor="release_date">Release Date*</label>
            <br/>
            <input id="release_date" name="release_date" type="date" placeholder='Select the release date'></input>
            <br/>

            <label htmlFor="first_name">Author's First Name*</label>
            <br/>
            <input id="first_name" name="first_name" type="text" placeholder='Enter the first name'></input>
            <br/>

            <label htmlFor="last_name">Author's Last Name*</label>
            <br/>
            <input id="last_name" name="last_name" type="text" placeholder='Enter the last name'></input>
            <br/>

            <label htmlFor="description">Description</label>
            <br/>
            <textarea maxLength="400" id="description" rows="5" cols="60" name="description" placeholder='Enter the description'></textarea>
            <br/>
        </form>
        <div id="button-container">
            <Button text="Cancel" width="100px" height="36px" color="#1F271B" backgroundColor="white" border="1px #1F271B solid" onClick={props.onClick}></Button>
            <Button text="Save" width="100px" height="36px" backgroundColor="#1F271B" onClick={props.submit}></Button>
        </div>
    </div>
    )
}

export default FormWindow