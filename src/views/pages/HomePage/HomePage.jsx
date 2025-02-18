import { useContext } from 'react';

import { UserContext } from '../../../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    (user ? (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user.username}</p>
      </div>
    ) : (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, please login</p>
      </div>
    )
  )
  );
};

export default Dashboard;