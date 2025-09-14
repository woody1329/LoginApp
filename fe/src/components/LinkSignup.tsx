import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LinkSignup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
      No account?{' '}
      <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
        Sign up!
      </Link>
    </Typography>
  );
};

export default LinkSignup;
