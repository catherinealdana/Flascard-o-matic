import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(1);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("Error loading cards", error);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const nextCard = (index, total) => {
    if (index < total) {
      setCardNumber((prevCardNumber) => prevCardNumber + 1);
      setIsFront(true);
    } else {
      const restartConfirmation = window.confirm(
        "Would you like to reset the cards? If not, you will be directed to the home page."
      );
      if (restartConfirmation) {
        setCardNumber(1);
        setIsFront(true);
      } else {
        history.push("/");
      }
    }
  };

  const flipHandler = () => {
    setIsFront((prevIsFront) => !prevIsFront);
  };

  const showNextButton = (index) => {
    if (isFront) {
      return null;
    } else {
      return (
        <button
          onClick={() => nextCard(index + 1, cards.length)}
          className="btn btn-primary mx-1"
        >
          Next
        </button>
      );
    }
  };

  const notEnoughCards = () => {
    const addCardsLink = `/decks/${deck.id}/cards/new`;

    return (
      <div>
        <h4>Not Enough Cards.</h4>
        <p>
          To start studying, you require a minimum of 3 cards. There are {cards.length} cards in this deck.
        </p>
        <Link to={addCardsLink} className="btn btn-primary mx-1">
          + Add Cards
        </Link>
      </div>
    );
  };

  const enoughCards = () => {
    return (
      <div className="card">
        {cards.map((card, index) => {
          if (index === cardNumber - 1) {
            return (
              <div className="card-body" key={card.id}>
                <div className="card-title">
                  {`Card ${index + 1} of ${cards.length}`}
                </div>
                <div className="card-text">
                  {isFront ? card.front : card.back}
                </div>
                <button
                  onClick={flipHandler}
                  className="btn btn-secondary mx-1"
                >
                  Flip
                </button>
                {showNextButton(index)}
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Study</li>
      </ol>

      <div>
        <h2>{`${deck.name}: Study`}</h2>
        <div>{cards.length === 0 ? notEnoughCards() : cards.length > 2 ? enoughCards() : notEnoughCards()}</div>
      </div>
    </div>
  );
}

export default Study;