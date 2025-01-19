export async function getRandomNumbers(): Promise<number[]> {
  const response = await fetch(
    'http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=3',
  )
  if (!response.ok) {
    throw new Error('Failed to fetch random numbers')
  }
  return (await response.json()) as number[]
}
