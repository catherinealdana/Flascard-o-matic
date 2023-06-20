import React from "react";

function CardForm({
  handleSubmit,
  handleChange,
  handleDone,
  card,
  deck,
  edit,
  newCard,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {edit === true ? (
        <h2>{deck.name}: Edit Card</h2>
      ) : (
        <h2>{deck.name}: Add Card</h2>
      )}
      <div className="form-group">
        <label>Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          onChange={handleChange}
          type="text"
          placeholder="Front side of card."
          value={card ? card.front : newCard.value}
        />
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          onChange={handleChange}
          type="text"
          placeholder="Back side of card."
          value={card ? card.back : newCard.value}
        />
      </div>
      <button className="btn btn-secondary mx-1" onClick={() => handleDone()}>
        Done
      </button>
      <button className="btn btn-primary mx-1" type="submit">
        Save
      </button>
    </form>
  );
}

export default CardForm;