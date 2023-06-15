import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteDeck, listDecks } from '../utils/api/index'
//import { Button } from './Button'

export default function Home() {
//define variables 
	const [deckList, setDeckList] = useState([])
	//const history = useHistory([])

 useEffect(()=> {
	const abortController= new AbortController();
	const fetchData= async ()=> {
		try{
			const data= await listDecks(abortController.signal);
			setDeckList(data);

		}catch (error){
			console.log(error)
		}
	}
	fetchData();

	return ()=> abortController.abort();
 },[])

 const handleDeleteDeck = async(deckId)=> {
	const confirmed= window.confirm("Are you sure you want to delete this deck?");
	if(confirmed){
		try{
			await deleteDeck(deckId);
			setDeckList((prevDecks)=> prevDecks.filter((deck)=> deck.id !== deckId))
		} catch (error) {
			console.log(error)
		}
	}
 }
  return (
	<div>
		<Link to= "/decks/new" className="btn btn-primary">Create Deck</Link>
		{deckList.map((deck)=>(
			<div key={deck.id}>
		    <h2>{deck.name}</h2>
			<p>{`${deck.cardCount} cards`}</p>

		   <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary">Study</Link>
		   <Link to={`/decks/${deck.id}`} className="btn btn-primary">View</Link>
		   <button
		      type="button"
			  className="btn btn-danger"
			  onClick={()=> handleDeleteDeck(deck.id)}
			>
		   </button>
	
		   </div>
		))}
		
	</div>
  )
}