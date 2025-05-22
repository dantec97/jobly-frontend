import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../auth/UserContext';

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/companies">Companies</Link></li>
        {currentUser ? (
          <>
            <li><Link to="/profile">{currentUser.username}</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;