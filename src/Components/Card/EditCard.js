import React, { useState, useEffect } from "react";
import {useParams,useHistory,Link,} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialCardState = {
    id: " ",
    front: " ",
    back: " ",
  };
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState(initialCardState);
  const editCard = (true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deckResponse, cardResponse] = await Promise.all([
          readDeck(deckId),
          readCard(cardId),
        ]);
        setDeck(deckResponse);
        setCard(cardResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
  
    const abortController = new AbortController();
    fetchData();
  
    return () => {
      abortController.abort();
    };
  }, [deckId, cardId]);
  

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(element) {
    element.preventDefault();

    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  async function handleDone() {
    history.push(`/decks/${deck.id}`);
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
        <li className="breadcrumb-item active">{`Edit Card ${cardId}`}</li>
      </ol>

      <h2>Edit Card</h2>

      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDone={handleDone}
        deck={deck}
        card={card}
        edit={editCard}
      />
    </>
  );
}

export default EditCard;