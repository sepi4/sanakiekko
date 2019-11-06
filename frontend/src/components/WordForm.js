import React, { useState, useRef, useEffect } from 'react'

import { Form, Message, Button } from 'semantic-ui-react'

import { subSet } from '../utils/helpers'
import { useCustomErrorHandler } from './hooks'

function WordForm({ letters, socket }) {
  const [error, setError] = useState(null)
  const [serverError, showServerError] = useCustomErrorHandler()

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
    } else {
      setError(null)
    }
  }

  const returnWord = e => {
    // console.log('returnWord')
    let word = inputWord.current.value
    e.preventDefault()
    if (error) {
      setError('virhe')
    } else if (word.length < 1) {
      setError('sana liian lyhyt')
    } else {
      socket.emit('addWord', word, error => {
        showServerError(error)
      })
      inputWord.current.value = ''
    }
  }

  if (letters.length > 0) {
    return (
      <Form error style={{ margin: '10px 0 35px 0' }} onSubmit={returnWord}>

        <input
          style={{ width: '70%', margin: '0' }}
          ref={inputWord}
          type="text"
          onChange={testWord}
        />
        <Button
          style={{ width: '30%', margin: '0' }}
          type="submit"
          disabled={error !== null}
          color="blue"
        >
          tallenna
        </Button>
        <Message error header={error} />
        <Message error header={serverError} />
      </Form>
    )
  } else {
    return null
  }
}

export default WordForm
