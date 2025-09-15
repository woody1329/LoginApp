import { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import FullScreenCenter from './FullScreenCenter';
import LinkLogin from './LinkLogin';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (selectedFile) formData.append('image', selectedFile);

      const data = await signup(formData); // adjust API to accept FormData
      localStorage.setItem('token', data.token);
      navigate('/landing');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      console.error(err.message);
    }
  };

  return (
    <FullScreenCenter>
      <Box display="flex" flexDirection="column" sx={{ gap: 2, width: 300 }}>
        <Typography variant="h4" component="h1" textAlign="center">
          Sign Up
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
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Fun file upload */}
        <Button variant="outlined" component="label" fullWidth>
          Upload Your Secret Masterpiece
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
        </Button>
        {selectedFile && (
          <Typography variant="body2" textAlign="center">
            Selected: {selectedFile.name}
          </Typography>
        )}

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Sign Up
        </Button>
        
        <LinkLogin />
      </Box>
    </FullScreenCenter>
  );
};

export default Signup;
