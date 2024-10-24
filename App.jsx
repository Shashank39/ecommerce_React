import React from 'react';
import { useAuth } from './src/Context/AuthContext';
import AdminNavbar from './src/Components/Navbar/AdminNavbar';
import UserNavbar from './src/Components/Navbar/UserNavbar';

const App = () => {
  const { userRole } = useAuth();
  return (
    <div>
      {userRole === 'admin' ? <AdminNavbar /> : <UserNavbar />}
    </div>
  );
};

export default App;
