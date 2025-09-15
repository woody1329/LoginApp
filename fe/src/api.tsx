interface User {
  id: number;
  username: string;
  email: string;
  ascii_art?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ErrorResponse {
  errors?: string;
  error?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/auth';

export const signup = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/signup/`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.errors || 'Signup failed');
  }
  return response.json() as Promise<AuthResponse>; // Returns { user: { id, username, email }, token }
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  return response.json() as Promise<AuthResponse>; // Returns { user: { id, username, email }, token }
};

export const getUser = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  const response = await fetch(`${API_URL}/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Failed to fetch user');
  }
  return response.json() as Promise<User>;
};
