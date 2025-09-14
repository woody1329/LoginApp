import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from '@components/Signup'
import Login from '@components/Login';
import UserLanding from '@components/UserLanding';
import ProtectedRoute from '@components/ProtectedRoute';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <UserLanding />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;