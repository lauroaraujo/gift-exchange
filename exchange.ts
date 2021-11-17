import { selectRandomPairs } from './randomPairs.ts'

exchange()

function exchange () {
  const namesList = Deno.args

  if (namesList.length === 0) {
    console.log('Usage:')
    console.log('deno exchange.ts name1 name2 name3 ... nameN\n')
    console.log('At least 3 names are required, and no repetitions are allowed.')
    return
  }

  if (namesList.length < 3) {
    console.log('Please pass at least 3 names')
    return
  }

  if (new Set(namesList).size !== namesList.length) {
    console.log('You have duplicate names on your list. Please remove the duplicate or rename them.')
    return
  }

  const pairs = selectRandomPairs(namesList)
  pairs.forEach(({ gives, receives }) => console.log(`${gives} gives a gift to ${receives} `))
}
