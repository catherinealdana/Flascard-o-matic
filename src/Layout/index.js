import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Study from '../Decks/StudyDeck'
import Deck from '../Decks/Deck'
import CreateDeck from '../Decks/CreateDeck'
import NotFound from './NotFound'


function Layout() {
	return (
		<div className='container'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Home /> 
				</Route>
				<Route exact path='/decks/new'>
					<CreateDeck /> 
				</Route>
				<Route exact path='/decks/:deckId'>
					<Deck /> 
				</Route>
				<Route exact path='/decks/:deckId/study'>
					<Study />
				</Route>
				<Route>
					<NotFound /> 
				</Route>
			</Switch>
		</div>
	)
}

export default Layout