import React, { useState, useEffect } from "react";
import {useHistory,useParams,Link,} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import { deleteDeck, deleteCard } from "../../utils/api";

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  async function handleDeleteDeck(deck) {
    if (
      window.confirm(`Are you sure you want to permanently delete this Deck?`)
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  async function handleDeleteCard(card) {
    if (
      window.confirm(`Are you sure you want to permanently delete this card?`)
    ) {
      history.go(0);
      return await deleteCard(card.id);
    }
  }

  const card = cards.map((card) => {
    return (
      <div
        className="card p-3 text-secondary"
        style={{ width: "30rem" }}
        key={card.id}
      >
        <div className="row">
          <div className="col">
            <p>{card.front}</p>
          </div>
          <div className="col">
            <p>{card.back}</p>
            <Link
              className="btn btn-secondary mx-1"
              to={`/decks/${deck.id}/cards/${card.id}/edit`}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteCard(card)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">{deck.name}</li>
      </ol>
      <main>
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
        <div className="mb-4">
          <Link className="btn btn-secondary mr-1" to={`/decks/${deck.id}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-primary mr-1" to={`/decks/${deck.id}/study`}>
            Study
          </Link>
          <Link className="btn btn-primary mr-1" to={`/decks/${deck.id}/cards/new`}>
            + Add Cards
          </Link>
          <button
            type="button"
            className="btn btn-danger mr-1"
            onClick={() => handleDeleteDeck(deck)}
          >
            Delete
          </button>
        </div>
        <h2>Cards</h2>
        <div className="mb-5">{card}</div>
      </main>
    </>
  );
  
  
}

export default Deck;