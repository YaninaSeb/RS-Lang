export async function getWords(page: number, group: number) {
  const response = await fetch(`https://rs-lang25.herokuapp.com/words?page=${page}&group=${group}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const words = await response.json();
  return words;
}
