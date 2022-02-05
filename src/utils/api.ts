const server = 'http://rs-lang25.herokuapp.com';

export const getWords = async (page: number, group: number) => await (await fetch(`${server}/words?page=${page}&group=${group}`)).json(); 