import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserView from './components/UserView';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  } else if (user.rol === 'admin') {
    return <AdminPanel onLogout={handleLogout} />;
  } else {
    return <UserView user={user} onLogout={handleLogout} />;
  }
}

export default App;
