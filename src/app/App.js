import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import uid from 'uid'
import CardsPage from '../cards/CardsPage'
import CreatePage from '../create/CreatePage'
import {
  getAllCards,
  getCardsFromStorage,
  postNewCard,
  saveCardsToStorage,
  toggleCardBookmark,
} from '../services'
import SettingsPage from '../settings/SettingsPage'
import GlobalStyle from './GlobalStyle'

const Grid = styled.div`
  display: grid;
  grid-template-rows: ${props =>
    props.hasNoNetwork ? '20px auto 48px' : 'auto 48px'};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Message = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: #aaa;
`

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
`

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  color: white;
  text-decoration: none;

  &.active {
    background: hotpink;
  }
`

function App() {
  const [cards, setCards] = useState(getCardsFromStorage())
  const [hasNoNetwork, setHasNoNetwork] = useState(false)

  useEffect(() => {
    getAllCards()
      .then(res => {
        setCards(res.data)
      })
      .catch(res => {
        setHasNoNetwork(res.message.toLowerCase().includes('network error'))
      })
  }, [])

  useEffect(() => {
    saveCardsToStorage(cards)
  }, [cards])

  function createCard(data) {
    hasNoNetwork
      ? setCards([...cards, { ...data, _id: uid() }])
      : postNewCard(data).then(res => {
          setCards([...cards, res.data])
        })
  }

  function toggleBookmark(card) {
    const index = cards.indexOf(card)
    hasNoNetwork
      ? updateCard(index, { ...card, bookmarked: !card.bookmarked })
      : toggleCardBookmark(card)
          .then(res => {
            updateCard(index, res.data)
          })
          .catch(err => console.log(err))
  }

  function updateCard(index, data) {
    setCards([...cards.slice(0, index), { ...data }, ...cards.slice(index + 1)])
  }

  return (
    <Router>
      <Grid hasNoNetwork={hasNoNetwork}>
        {hasNoNetwork && <Message>Running without backend</Message>}
        <Route
          exact
          path="/"
          render={() => <CardsPage cards={cards} onBookmark={toggleBookmark} />}
        />
        <Route
          path="/bookmarks"
          render={() => (
            <CardsPage
              cards={cards.filter(card => card.bookmarked)}
              onBookmark={toggleBookmark}
            />
          )}
        />
        <Route
          path="/create"
          render={() => <CreatePage onSubmit={createCard} />}
        />
        <Route path="/settings" component={SettingsPage} />
        <Nav>
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink to="/bookmarks">Bookmarks</StyledLink>
          <StyledLink to="/create">Create</StyledLink>
          <StyledLink to="/settings">Settings</StyledLink>
        </Nav>
        <GlobalStyle />
      </Grid>
    </Router>
  )
}

export default App
