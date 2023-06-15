import React,{useEffect, useState} from "react";
import {Link, useParams,useHistory} from "react-router-dom";
import { readDeck } from "../utils/api";


function StudyDeck(){

    const {deckId}=useParams();
    const history= useHistory();
    const [deck, setDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped,setIsFlipped] = useState(false);

    useEffect(()=>{
        const abortController= new AbortController();

        async function fetchData(){
            try{
                const deckData =await readDeck (deckId, abortController.signal);
                setDeck(deckData);

            }catch (error){
                console.log(error);
            }
        }
        fetchData();
        return()=> abortController.abort();
    },[deckId])

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
      };

    const handleNextCard=()=> {
        setCurrentCardIndex((prevIndex)=> prevIndex+1);
        setIsFlipped(false);
    };

    const handleRestartDeck=()=> {
        const confirmed= window.confirm('Do you want to restart the deck? You will go back to the first card.')
        if(confirmed){
            setCurrentCardIndex(0);
            setIsFlipped(false);

        } else{
            history.push('/');
        }
    }
 if (!deck) {
    return <div>loading...</div>;
  }

  const {cards} = deck;
  const currentCard =cards[currentCardIndex];

  if(cards.length < 3){
    return (
        <div>
            <h2>Not enough cards</h2>
            <p>You need at least 3 cards in the deck to start studying.Please add more cards to the deck. </p>
            <link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</link>
        </div>
    )
  }
  if (currentCardIndex >= cards.length){
    return (
        <div>
            <h2>Restart Prompt</h2>
            <p>You have finished studying all the cards in the deck.</p>
            <button className="btn btn-primary" onClick={handleRestartDeck}>Restart Deck</button>
            <Link to="/" className="btn btn-secondary">Return to home</Link>
        </div>
    )
  }
  return(
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h2>Study: {deck.name}</h2>
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Card {currentCardIndex +1} of {cards.length}</h5>
            <p className="card-text">{isFlipped ? currentCard.back: currentCard.front}</p>
            <button className="btn btn-secondary" onClick={handleFlipCard}>Flip</button>
            {isFlipped && (
                <button className="btn btn-primary" onClick={handleNextCard}>Next</button>
            )}
        </div>
    </div>
    </div>
  )
}

export default StudyDeck;


