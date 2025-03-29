import React, { useState } from 'react';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserView from './components/UserView';

function App() {
  const [user, setUser] = useState(null);

  // Se puede agregar lógica de ruteo con react-router-dom para separar vistas

  if (!user) {
    return <Login onLogin={setUser} />;
  } else if (user.rol === 'admin') {
    return <AdminPanel />;
  } else {
    return <UserView user={user} />;
  }
}

export default App;
