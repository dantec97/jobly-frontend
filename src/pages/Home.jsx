import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to Jobly</h1>
      {currentUser
        ? <h2>Hello, {currentUser.username}!</h2>
        : <h2>Please log in or sign up to get started.</h2>
      }
    </div>
  );
};

export default Home;