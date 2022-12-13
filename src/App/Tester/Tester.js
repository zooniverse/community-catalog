import React, { useState } from 'react'
import { Box, Form, Paragraph as P, TextInput } from 'grommet'
import { talkAPI } from '@zooniverse/panoptes-js'
import { Markdownz, PrimaryButton } from '@zooniverse/react-components'

export default function Tester () {
  const [ query, setQuery ] = useState('')
  const [ results, setResults ] = useState([])

  function textQuery_onChange (e) {
    setQuery(e?.target?.value || '')
  }

  function formTester_onSubmit () {
    console.log('+++ SUBMITTED: ', query)
    fetchTalkSearchResults(query)
  }

  async function fetchTalkSearchResults (query) {
    try {
      const response = await talkAPI.get('/searches', {
        section: 'zooniverse',
        types: 'comments',
        page: 1,
        page_size: 20,
        query
      })

      if (!response?.ok) throw new Error('Couldn\'t fetch Talk search results')

      const results = response.body?.searches.filter(s => s?.body) || []
      setResults(results)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box>
      <Form
        className='form-tester'
        onSubmit={formTester_onSubmit}
      >
        <P>Tester Component</P>
        <TextInput
          className='text-query'
          onChange={textQuery_onChange}
          placeholder='Search Zooniverse Talk (hint: use env=production)'
          value={query}
        />
        <PrimaryButton
          className='button-submit'
          primary label='Submit'
          type='submit'
        />
      </Form>
      {results.map(result => {
        return (
          <Markdownz
            baseURI='https://www.zooniverse.org'
          >
            {result.body}
          </Markdownz>
        )
      })}

    </Box>
  )
}
