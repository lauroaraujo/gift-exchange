export function selectRandomPairs (namesList: string[], randomFn: () => number = Math.random) {
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

export function randomizeStringArray (array: string[], randomFn: () => number = Math.random) {
  if (array.length < 3) {
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
