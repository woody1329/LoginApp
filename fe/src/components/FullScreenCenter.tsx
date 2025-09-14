import { Box } from '@mui/material';

const FullScreenCenter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {children}
  </Box>
);

export default FullScreenCenter;
