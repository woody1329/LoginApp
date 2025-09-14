import { useState, useEffect } from 'react';
import { getUser } from '../api';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FullScreenCenter from './FullScreenCenter';

const UserLanding: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string; ascii_art?: string } | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user)
    return (
      <FullScreenCenter>
        <CircularProgress />
      </FullScreenCenter>
    );

  return (
    <FullScreenCenter>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ gap: 2, width: 400 }}>
        <Typography variant="h4" component="h1" textAlign="center">
          Welcome, {user.username}!
        </Typography>

        <Typography variant="body1" textAlign="center">
          Email: {user.email}
        </Typography>

        <Box
          sx={{
            border: '1px solid #ccc',
            padding: 2,
            mt: 2,
            width: '100%',
            minHeight: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {user.ascii_art ? (
            <pre style={{ fontFamily: 'monospace', lineHeight: '6px', fontSize: '6px' }}>
              {user.ascii_art}
            </pre>
          ) : (
            <Typography variant="body2" color="textSecondary" textAlign="center">
              Pending your masterpiece...
            </Typography>
          )}
        </Box>

        <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </FullScreenCenter>
  );
};

export default UserLanding;
