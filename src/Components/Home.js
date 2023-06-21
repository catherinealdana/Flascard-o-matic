import React from "react";
import { listDecks, deleteDeck } from "../utils/api";
import {  Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
 
  const [decks, setDecks] = useState([]);
  const history= useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function handleDelete(deck) {
    if (
      window.confirm(`Are you sure you want to permanently delete this Deck?`)
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  

  const listOfDecks = decks.map((deck) => {
    return (
      <div className="card mb-3" style={{ width: "30rem" }} key={deck.id}>
        <div className="card-body">
          <div className="card-title">{`${deck.name}`}</div>
          <div className="card-subtitle mb-2 text-muted">
            {`${deck.cards.length} cards`}
          </div>
          <div className="card-text">{`${deck.description}`}</div>
          <Link className="btn btn-secondary mx-1" to={`/decks/${deck.id}`}>
            View
          </Link>
          <Link className="btn btn-primary mx-1" to={`/decks/${deck.id}/study`}>
            Study
          </Link>
          <button
            type="button"
            className="btn btn-danger mx-1"
            onClick={() => handleDelete(deck)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Link className="btn btn-secondary mb-4" to="/decks/new">
        Create Deck +
      </Link>
      <div>{listOfDecks}</div>
    </div>
  );
}

export default Home;