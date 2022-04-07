import React from 'react'
import Button from './Button'
import './FormWindow.css'

const FormWindow = (props) => {

    return (
    <div id="form-window-container">
        <div id="form-window-title">Add a new entry</div>
        <form id="form">
            <label htmlFor="title">Title*</label>
            <br/>
            <input name="title" type="text"></input>
            <br/>

            <label htmlFor="release_date">Release Date*</label>
            <br/>
            <input name="release_date" type="date"></input>
            <br/>

            <label htmlFor="first_name">Author's First Name*</label>
            <br/>
            <input name="first_name" type="text"></input>
            <br/>

            <label htmlFor="last_name">Author's Last Name*</label>
            <br/>
            <input name="last_name" type="text"></input>
            <br/>

            <label htmlFor="description">Description</label>
            <br/>
            <textarea rows="5" cols="60" name="description"></textarea>
            <br/>
        </form>
        <div id="button-container">
            <Button text="Cancel" width="140px" height="36px" color="#1993F0" backgroundColor="white" border="1px #1993F0 solid" onClick={props.onClick}></Button>
            <Button text="Add" width="140px" height="36px" backgroundColor="#1993F0" onClick={props.addBook}></Button>
        </div>
    </div>
    )
}

export default FormWindow