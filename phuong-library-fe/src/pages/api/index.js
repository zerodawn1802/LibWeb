import axios from 'axios';

const url = 'http://localhost:1337/books';

export const readBooks = () => axios.get(url);
export const readBook = (id) => axios.get(`${url}/${id}`)
export const createBook = newBook => axios.post(url , newBook, { headers: { "Content-Type": "multipart/form-data" } });
export const updateBook = (id, updatedBook) => axios.put(`${url}/${id}`, updatedBook);
export const deleteBook = (id) => axios.delete(`${url}/${id}`);

export const getCategories = () => axios.get(`http://localhost:1337/categories`)