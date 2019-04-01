import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.section`
  padding: 18px 18px 0;
  background: #fafafa;
  border: 2px solid #ccc;
  border-radius: 4px;
  position: relative;
`

const TagList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 2px 6px;
  background: #333;
  border-radius: 6px;
  color: white;
  font-size: 0.8em;
`

const Bookmark = styled.div`
  position: absolute;
  right: 12px;
  top: -6px;
  width: 20px;
  height: 6px;
  background: ${p => (p.active ? 'crimson' : 'black')};
  transition: all 0.4s ease;

  &:after {
    transition: all 0.4s ease;
    position: absolute;
    display: block;
    top: 100%;
    content: '';
    border: 10px solid ${p => (p.active ? 'crimson' : 'black')};
    border-bottom-color: transparent;
  }
`

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmarked: PropTypes.bool,
  onBookmark: PropTypes.func,
}

Card.defaultProps = {
  title: 'No title defined',
  content: 'No content defined',
  bookmarked: false,
}

export default function Card({ title, content, tags, bookmarked, onBookmark }) {
  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }

  return (
    <div css="padding: 10px 0 0; scroll-snap-align: start;">
      <StyledCard>
        {onBookmark && <Bookmark active={bookmarked} onClick={onBookmark} />}
        <h3>{title}</h3>
        <p>{content}</p>
        {tags && <TagList>{tags.map(renderTag)}</TagList>}
      </StyledCard>
    </div>
  )
}
