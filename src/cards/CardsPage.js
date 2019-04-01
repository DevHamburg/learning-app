import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../common/Header'
import Card from './Card'
import CardContainer from './CardContainer'

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`

export default function CardsPage({ onBookmark, cards }) {
  const [activeTag, setActiveTag] = useState('all')

  return (
    <PageGrid>
      <Header cards={cards} activeTag={activeTag} setActiveTag={setActiveTag} />
      <CardContainer>
        {cards
          .filter(card => activeTag === 'all' || card.tags.includes(activeTag))
          .map(card => (
            <Card
              {...card}
              key={card._id}
              onBookmark={() => onBookmark(card)}
            />
          ))}
      </CardContainer>
    </PageGrid>
  )
}
