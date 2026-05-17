const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const publicHeaders = () => ({
  'Content-Type': 'application/json',
});

const guardedFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.resolve(null);
  return fetch(url, { ...options, headers: getHeaders() }).then(r => r.json());
};

export const api = {
  
  register: (data: any) => fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: publicHeaders(), // ← no token sent
    body: JSON.stringify(data)
  }).then(r => r.json()),

  login: (data: any) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: publicHeaders(), // ← no token sent
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getMe: () => guardedFetch(`${API_URL}/auth/me`),

 
  getListings: (params?: string) => fetch(
    `${API_URL}/listings${params ? '?' + params : ''}`,
    { headers: publicHeaders() } // ← public, no token needed
  ).then(r => r.json()),

  getListing: (id: string) => fetch(
    `${API_URL}/listings/${id}`,
    { headers: publicHeaders() } // ← public
  ).then(r => r.json()),

  getMyListings: () => guardedFetch(`${API_URL}/listings/my`),

  createListing: (data: any) => fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  updateListing: (id: string, data: any) => fetch(`${API_URL}/listings/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  deleteListing: (id: string) => fetch(`${API_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  }).then(r => r.json()),

  
  createRequest: (data: any) => fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getIncomingRequests: () => guardedFetch(`${API_URL}/requests/incoming`),
  getSentRequests: () => guardedFetch(`${API_URL}/requests/sent`),

  updateRequest: (id: string, data: any) => fetch(`${API_URL}/requests/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(r => r.json()),

  
  getPlatformStats: () => fetch(
    `${API_URL}/stats/platform`,
    { headers: publicHeaders() } // ← public
  ).then(r => r.json()),

  getUserStats: () => guardedFetch(`${API_URL}/stats/user`),


  submitContact: (data: any) => fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(data)
  }).then(r => r.json()),
};