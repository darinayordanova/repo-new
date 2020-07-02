
import React, { useEffect, useState } from "react";
import { firestore } from '../../Firebase/firebase'


function Books() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await firestore.collection("books").get();
            setBooks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
        console.log(books)
    }, []);
    
    return (
        <div>
            <h1>Books</h1>

            {books.map(book => (
                <p key={book.id}>{book.title}</p>
            ))}
        </div>
    );
}

export default Books;
