import { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await signup(username, email, password);
      localStorage.setItem('token', data.token);
      navigate('/landing');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;