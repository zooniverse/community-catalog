import { Footer as GrommetFooter, Text } from 'grommet'

export default function Footer () {
  return (
    <GrommetFooter
      pad='small'
      direction='column'
    >
      <Text
        size='small'
        textAlign='center'
      >
        This page made possible by Communities and Crowds, Zooniverse, and viewers like you.
      </Text>
    </GrommetFooter>
  )
}
