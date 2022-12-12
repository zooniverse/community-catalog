import React, { useState } from 'react'
import { Button, Form, Paragraph as P, TextInput } from 'grommet'
import { talkAPI } from '@zooniverse/panoptes-js'

export default function Tester () {
  const [ query, setQuery ] = useState('')

  function textQuery_onChange (e) {
    setQuery(e?.target?.value || '')
  }

  function form_onSubmit () {
    console.log('+++ SUBMITTED: ', query)
  }

  return (
    <Form
      onSubmit={form_onSubmit}
    >
      <P>Tester Component</P>
      <TextInput
        className='text-query'
        onChange={textQuery_onChange}
        placeholder='Type in a query'
        value={query}
      />
      <Button
        className='button-submit'
        primary label='Submit'
        type='submit'
      />
    </Form>
  )
}
