type ExchagePair = {
  gives: string,
  receives: string
}

/**
 * Given an array of names, returns an array of ExchangePair objects where:
 *  - the giver is never the same as the receiver.
 *  - every name give a gift and receives a give.
 * The minimum number of names for this to work is 3, so we return an empty array if that's the case.
 *
 * The stragtegy is: randomize the input array, and then simply follow the randomized array order.
 * i.e.: randomArr[0] -> randomArr[1]; randomArr[1] -> randomArr[2] ... randomArr[N] -> randomArr[0]
 */
export function selectRandomPairs (namesList: string[], randomFn: () => number = Math.random): ExchagePair[] {
  if (namesList.length < 3) {
    return []
  }

  const randomNamesList = randomizeStringArray(namesList, randomFn)

  return randomNamesList.map((name, index) => {
    const receivesIndex = index === randomNamesList.length - 1
      ? 0
      : index + 1

    return {
      gives: name,
      receives: randomNamesList[receivesIndex]
    }
  })
}

/**
 * Takes an array of strings and  randomizes its items positions (shuffles it).
 *
 * @param array Array of strings.
 * @param randomFn Optional random functions (used Math.random as default)
 * @returns A new array with the same elements as the original array, but in a random order.
 *          Please note that this can return the same order, especially for small arrays.
 */
export function randomizeStringArray (array: string[], randomFn: () => number = Math.random) {
  if (array.length < 2) {
    return [...array]
  }

  const randomlyWeightedArray = array.map((value) => ({
    value,
    compareIndex: randomFn()
  }))

  return randomlyWeightedArray
    .sort((arr1, arr2) => arr1.compareIndex - arr2.compareIndex)
    .map(({ value }) => value)
}
