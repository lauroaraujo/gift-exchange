import {  assertEquals, assertNotEquals, assertNotStrictEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { randomizeStringArray, selectRandomPairs } from './index.ts'

Deno.test('selectRandomPairs returns an empty array if given less than three names', () => {
  assertEquals(selectRandomPairs([]), [])
  assertEquals(selectRandomPairs(['lisa']), [])
  assertEquals(selectRandomPairs(['leon', 'lisa']), [])
})

Deno.test('selectRandomPairs returns an array with unique pair objects', () => {
  const RANDOM_RESULTS = [0.4, 0.3, 0, 0.2, 0.1]
  const mockRandomFn = () => RANDOM_RESULTS.shift() ?? 0

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

  // Mock Math.random with predictable results
  const RANDOM_RESULTS = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]
  const mockRandomFn = () => RANDOM_RESULTS.shift() ?? 0

  const output = randomizeStringArray(input, mockRandomFn)

  assertEquals(input.length, output.length)
  assertEquals(new Set(input), new Set(output))
  assertNotStrictEquals(input, output)
  assertEquals(output, ['belle', 'barb', 'bob',   'tam', 'tim',   'tom', 'jules', 'jim', 'jane',  'john'])
  assertNotEquals(input, output)
})
