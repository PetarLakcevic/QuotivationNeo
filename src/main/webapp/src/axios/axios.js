import axios from 'axios';

const apiUrl = 'http://localhost:8080' + '/api';
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const authorization = localStorage.getItem('token');

const api = axios.create({
  baseURL: apiUrl,
  headers: headers,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const loginReq = (username, password) => {
  return api.post('/authenticate', { username, password });
};

const registerReq = (login, password, firstName, lastName, email) => {
  return api.post('/register', { login, password, firstName, lastName, email, authorities: ['ROLE_USER'], activated: true });
};

const accountReq = () => {
  return api.get('/account');
};

const changePasswordReq = (currentPassword, newPassword) => {
  return api.post('/account/change-password', { currentPassword, newPassword });
};

const getQuotes = () => {
  return api.get('/quotes');
};

const getQuote = id => {
  return api.get(`/quotes/${id}`);
};

const deleteQuote = id => {
  return api.delete(`/quotes/${id}`);
};

const addQuote = (text, author, categories) => {
  return api.post('/quotes', { text, author, categories });
};

const updateQuote = (id, text, author, categories) => {
 return api.put(`/quotes/${id}`, { id, text, author, categories });
};

const getAuthors = () => {
  return api.get('/authors');
};

const getAuthor = id => {
  return axios.get(`${apiUrl}/authors/${id}`, { headers: { Authorization: `Bearer ${authorization}` } });
};

const deleteAuthor = id => {
    return api.delete(`/authors/${id}`);
};

const addAuthor = name => {
  return api.post('/authors', { name });
};

const updateAuthor = (id, name) => {
  return api.put(`/authors/${id}`, { id, name });
};

const getCategories = () => {
  return api.get('/categories');
};

const getCategory = id => {
  return api.get(`/categories/${id}`);
};

const deleteCategory = id => {
  return api.delete(`/categories/${id}`);
};

const addCategory = name => {
  return api.post('/categories', { name });
};

const updateCategory = (id, name, quotes) => {
  return api.put(`/categories/${id}`, { id, name, quotes });
};

const getUsers = () => {
 return api.get('/admin/users');
};

const deleteUser = id => {
  return api.delete(`/admin/users/${id}`);
};

const getSuggestions = () => {
  return api.get('/quote-suggestions');
};

const postSuggestion = (text) => {
  return api.post('/quote-suggestions', { text });
};

const getAdditionalFields = (id) => {
  return api.get('/user-additional-fields/' + id);
};

const setTheme = (id) => {
  return api.patch('/set/theme/' + id);
};

const setCategory = (data) => {
  return api.post('/set/category', data);
};

const getCurrentQuote = () => {
  return api.get('/current/quote');
};

const getHistory = () => {
  return api.get('/quote/history');
};

export {
  loginReq,
  registerReq,
  accountReq,
  changePasswordReq,
  getQuotes,
  getQuote,
  deleteQuote,
  addQuote,
  updateQuote,
  getAuthors,
  getAuthor,
  deleteAuthor,
  addAuthor,
  updateAuthor,
  getCategories,
  getCategory,
  deleteCategory,
  addCategory,
  updateCategory,
  getUsers,
  deleteUser,
  getSuggestions,
  postSuggestion,
  getAdditionalFields,
  setTheme,
  setCategory,
  getCurrentQuote,
  getHistory,
};
