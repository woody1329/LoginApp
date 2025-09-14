import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LinkLogin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
      Already have an account?{' '}
      <Link component="button" variant="body2" onClick={() => navigate('/login')}>
        Log in!
      </Link>
    </Typography>
  );
};

export default LinkLogin;
