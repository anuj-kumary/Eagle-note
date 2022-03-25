import axios from 'axios';

export const loginServices = async (email, password) =>
  await axios.post(`/api/auth/login`, {
    email,
    password,
  });

export const signupServices = async ({ email, password, name }) =>
  await axios.post(`/api/auth/signup`, {
    email,
    password,
    name,
  });

export const postNotes = async ({ encodedToken, note }) =>
  await axios.post(
    '/api/notes',
    { note },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const getNotes = async ({ encodedToken }) =>
  await axios.get('/api/notes', {
    headers: {
      authorization: encodedToken,
    },
  });
