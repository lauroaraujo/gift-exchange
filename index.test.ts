import {  assertEquals, assertNotStrictEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { randomizeStringArray } from './index.ts'

Deno.test('randomizeStringArray() returns a new array', () => {
  const original = ['john']
  const output = randomizeStringArray(original)

  assertNotStrictEquals(original, output)
  assertEquals(original, output)
})
