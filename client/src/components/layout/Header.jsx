import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Creator Dashboard
        </Link>

        <nav className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-200">
                Dashboard
              </Link>
              <Link to="/feed" className="hover:text-indigo-200">
                Feed
              </Link>
              <Link to="/credits" className="hover:text-indigo-200">
                Credits
              </Link>
              <Link to="/profile" className="hover:text-indigo-200">
                Profile
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:text-indigo-200">
                  Admin
                </Link>
              )}
              <Button onClick={handleLogout} variant="outline-white" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-indigo-200">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;