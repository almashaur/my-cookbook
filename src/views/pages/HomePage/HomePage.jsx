import { useContext } from 'react';

import { UserContext } from '../../../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      {!user ? (
        <h1>Welcome, Guest</h1>
      ) : (
        <>
          <h1>Welcome, {user.username}</h1>
          <p>
            This is the dashboard page where you can see a list of all the users.
          </p>
        </>
      )}
    </main>
  );
};

export default Dashboard;
