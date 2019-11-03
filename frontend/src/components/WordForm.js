import React, { useState, useRef, useEffect } from 'react'

import { Form, Message, Button, Input } from 'semantic-ui-react'

import { subSet } from '../utils/helpers'

function WordForm({ letters }) {
  const [error, setError] = useState(null)

  let inputWord = useRef()

  useEffect(() => {
    if (inputWord.current) {
      inputWord.current.focus()
    }
  }, [])

  const testWord = e => {
    let word = e.target.value
    word.split('')
    if (!subSet(word, letters)) {
      setError('virhe')
    } else {
      setError(null)
    }
    console.log('testWord', letters)
  }

  const returnWord = e => {
    e.preventDefault()
    console.log('returnWord')
  }
  return (
    <Form error onSubmit={returnWord}>
      <Input ref={inputWord} type="text" onChange={testWord} />
      <Button type='submit' color='blue'>tallenna</Button>
      <Message error header={error} />
    </Form>
  )
}

export default WordForm
