import { signup, login } from './api';

// Example: Signup
export const handleSignup = async () => {
  try {
    const data = await signup('testuser', 'test@example.com', 'password123');
    console.log('Signed up:', data.user, data.token);
    // Store token in localStorage or state
    localStorage.setItem('token', data.token);
  } catch (error: any) {
    console.error(error.message);
  }
};

// Example: Login
export async function handleLogin(): Promise<void> {
    try {
        const data = await login('testuser', 'password123');
        console.log('Logged in:', data.user, data.token);
        localStorage.setItem('token', data.token);
    } catch (error: any) {
        console.error(error.message);
    }
}
