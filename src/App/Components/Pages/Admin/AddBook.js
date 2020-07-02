import React, { Component, useState, useEffect } from 'react';
import { UserContext } from '../../../Context/userContext'
import withAuthorization from '../../../Session/withAuthorization';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { withFirebase } from '../../Firebase/context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { firestore } from '../../Firebase/firebase'


function AddBook() {
    return (
        <div>
            <h1>AddBook</h1>
            <Books />
        </div>
    );
}
function BooksBase() {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [language, setLanguage] = useState('')
    const [genre, setGenre] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [bookedDates, setBookedDates] = useState([])

    const HandleSubmit = (e, title, author, description) => {
        e.preventDefault();
        firestore.collection("books").add({
            title: title,
            author: author,
            description: description
        }).then(res => {
            setTitle('');
            setAuthor('');
            setLanguage('');
            setGenre('');
            setImage('');
            setDescription('');
            setBookedDates([]);

        }
        );
    }

    const isInvalid = title === '' || description === '';
    return (
        <div>
            <form className="forms" onSubmit={(e) => HandleSubmit(e, title, author, description)}>
                <TextField
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <TextField
                    name="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="author"
                />
                <TextField

                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />


                <Button disabled={isInvalid} type="submit">Add Book</Button>

            </form>
        </div>
    );
}


const condition = authUser => authUser.role === "admin";

const Books = withFirebase(BooksBase);

export default withAuthorization(condition)(AddBook);


