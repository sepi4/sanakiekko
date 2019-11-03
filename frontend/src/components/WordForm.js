import React, { useState, useRef, useEffect } from 'react'

import { Form, Message, Button, Input } from 'semantic-ui-react'

import { subSet } from '../utils/helpers'

function WordForm({ letters, socket }) {
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
      setError('sanassa vääriä kirjaimia')
    }  else {
      setError(null)
    }
    // console.log('testWord', letters)
  }

  const returnWord = e => {
    // console.log('returnWord')
    let word = inputWord.current.value
    e.preventDefault()
    if (error) {
      setError('virhe')
    } else if (word.length < 5) {
      setError('sana liian lyhyt')
    } else {
      socket.emit('returnWord', word)
      inputWord.current.value = ''
    }
  }
  return (
    <Form error onSubmit={returnWord}>
      <input ref={inputWord} type="text" onChange={testWord} />
      <Button type="submit" disabled={error !== null} color="blue">
        tallenna
      </Button>
      <Message error header={error} />
    </Form>
  )
}

export default WordForm
