import React, { useState } from 'react'
import { Button, Form, Paragraph as P, TextInput } from 'grommet'
import { talkAPI } from '@zooniverse/panoptes-js'

export default function Tester () {
  const [ query, setQuery ] = useState('')

  function textQuery_onChange (e) {
    setQuery(e?.target?.value || '')
  }

  function formTester_onSubmit () {
    console.log('+++ SUBMITTED: ', query)

    talkAPI.get('/searches', {
      section: 'zooniverse',
      types: 'comments',
      page: 1,
      page_size: 20,
      query
    }).then(res => console.log(res))
  }

  return (
    <Form
      className='form-tester'
      onSubmit={formTester_onSubmit}
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
