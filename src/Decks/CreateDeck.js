import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom"
import { createDeck } from "../utils/api";


function CreateDeck() {
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const history = useHistory();


    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange= (event)=>{
        setDescription(event.target.value);
    }

    const handleSubmit= async(event) => {
        event.preventDefault();

     const newDeck={
        name:name,
        description: description,
     };

     try {
        const createdDeck = await createDeck(newDeck);
        history.push(`/decks/${createdDeck.id}`);
     } catch(error){
        console.log(error);

     }
    }
     const handleCancel=()=>{
        history.push("/");
     }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">CreateDeck</li>
                </ol>
            </nav>
            <h2> CreateDeck</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                    
                    type='text'
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor= "description" className="form-label">Description</label>
                    <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows="3"
                    
                    
                    
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button
                   type="button"
                   className="btn btn-secondary"
                   onClick={handleCancel}>Cancel</button>

            </form>
        </div>
    )
}

export default CreateDeck;