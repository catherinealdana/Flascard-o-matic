import React, { useEffect, useState } from "react";
import {useParams,Link,useHistory,} from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState(initialDeckState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  async function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Deck</li>
      </ol>

      <h2>Edit Deck</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={deck.name}
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
            value={deck.description}
            id="description"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleCancel} className="btn btn-secondary mx-2">
          Cancel
        </button>
        <button
          onSubmit={handleUpdate}
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

export default EditDeck;