import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '../cards/Card'
import CardContainer from '../cards/CardContainer'
import { split } from '../utils'
import Form from './Form'
import Title from '../common/Title'

const Grid = styled.section`
  display: grid;
  align-content: flex-end;
  padding: 12px;
`
const defaultData = {
  title: '',
  content: '',
  tags: '',
}
export default function CreatePage(props) {
  const [data, setData] = useState(defaultData)

  function onInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    const tags = split(data.tags)
    props.onSubmit({ ...data, tags })
    setData(defaultData)
  }

  const { title, content, tags } = data
  return (
    <Grid>
      <Title css="position: absolute; top: 0; width: 100%">Create</Title>
      <CardContainer data-cy="preview-container">
        {(title || content || tags) && (
          <Card
            title={title || 'No title yet'}
            content={content || 'No content yet'}
            tags={split(tags)}
          />
        )}
      </CardContainer>
      <Form data={data} onSubmit={onSubmit} onInputChange={onInputChange} />
    </Grid>
  )
}
