export const getWords = async (numPage: number, numGroup: number) => {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/words?page=${numPage}&group=${numGroup}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
  
    console.log(content);

    return content;
};

