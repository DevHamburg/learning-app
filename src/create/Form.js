import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: grid;
  grid-gap: 12px;
  grid-template-rows: 40px 60px 40px 48px;
`

export default function Form({ data, onSubmit, onInputChange }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <input
        onChange={onInputChange}
        value={data.title}
        type="text"
        placeholder="Title"
        name="title"
      />
      <textarea
        onChange={onInputChange}
        value={data.content}
        placeholder="Content"
        name="content"
        cols="30"
        rows="10"
      />
      <input
        onChange={onInputChange}
        value={data.tags}
        type="text"
        placeholder="Tags"
        name="tags"
      />
      <button>Create</button>
    </StyledForm>
  )
}
