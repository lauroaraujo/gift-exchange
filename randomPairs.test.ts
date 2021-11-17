import {  assertEquals, assertNotStrictEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { randomizeStringArray, selectRandomPairs } from './randomPairs.ts'

Deno.test('selectRandomPairs returns an empty array if given less than three names', () => {
  assertEquals(selectRandomPairs([]), [])
  assertEquals(selectRandomPairs(['lisa']), [])
  assertEquals(selectRandomPairs(['leon', 'lisa']), [])
})

Deno.test('selectRandomPairs returns an array with unique pair objects', () => {
  const mockRandomFn = getRandomFnMock([0.4, 0.3, 0, 0.2, 0.1])

  const pairs = selectRandomPairs(['Susan', 'Beth', 'Abe', 'Ardi', 'Quan'], mockRandomFn)
  assertEquals(pairs, [
    { gives: 'Abe', receives: 'Quan' },
    { gives: 'Quan', receives: 'Ardi' },
    { gives: 'Ardi', receives: 'Beth' },
    { gives: 'Beth', receives: 'Susan' },
    { gives: 'Susan', receives: 'Abe' }
  ])
})

Deno.test('randomizeStringArray() returns a randomized array', () => {
  const input = ['john', 'jane', 'jim', 'jules', 'tom', 'tim', 'tam', 'bob', 'barb', 'belle']

  const mockRandomFn = getRandomFnMock([0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0])
  const output = randomizeStringArray(input, mockRandomFn)

  assertEquals(input.length, output.length)
  assertEquals(new Set(input), new Set(output))
  assertNotStrictEquals(input, output)
  assertEquals(output, ['belle', 'barb', 'bob',   'tam', 'tim',   'tom', 'jules', 'jim', 'jane',  'john'])
})

Deno.test('randomizeStringArray() works for small or empty arrays', () => {
  assertEquals(randomizeStringArray([]), [])
  assertEquals(randomizeStringArray(['kate']), ['kate'])

  const mockRandomFn = getRandomFnMock([0.1, 0])
  assertEquals(randomizeStringArray(['kate', 'karl'], mockRandomFn), ['karl', 'kate'])
})

function getRandomFnMock (randomResults: number[]) {
  return () => randomResults.shift() ?? 0 // If we run out of results, reutrn 0
}