import { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, Container } from '@mui/material';
import FullScreenCenter from './FullScreenCenter';
import LinkSignup from './LinkSignup';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/landing');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      console.error(err.message);
    }
  };

  return (
    <FullScreenCenter>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ gap: 2, width: 300, margin: '0 auto' }}
      >
        <Typography variant="h4" component="h1">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Log In
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <LinkSignup />
      </Box>
    </FullScreenCenter>
  );
};

export default Login;
