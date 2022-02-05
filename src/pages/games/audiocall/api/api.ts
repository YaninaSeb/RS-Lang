const server = 'http://rs-lang25.herokuapp.com';



export async function getWords(page: number, group: number) {
  const response = await fetch(`${server}/words?page=${page}&group=${group}`);
  const words = await response.json();
  return words;
}