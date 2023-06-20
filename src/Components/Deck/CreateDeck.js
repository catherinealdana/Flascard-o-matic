import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const history = useHistory();
  const initialDeckState = {
    name: " ",
    description: " ",
  };
  const [newDeck, setNewDeck] = useState(initialDeckState);

  function handleChange({ target }) {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push(`/`);
    return response;
  }

  async function handleCancel() {
    history.push(`/`);
  }

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Create Deck</li>
      </ol>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Deck name"
            className="form-control"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Brief description of the deck."
            id="description"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleCancel} className="btn btn-secondary mx-2">
         Cancel
        </button>
        <button
          onSubmit={handleSubmit}
          type="submit"
          className="btn btn-primary"
          to="/decks/:deckId"
        >
         Submit
        </button>
      </form>
    </>
  );
}

export default CreateDeck;