import { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/landing');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Log In</button>
    </div>
  );
};

export default Login;