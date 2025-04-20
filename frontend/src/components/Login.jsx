import React, { useState } from 'react';
import axios from 'axios';
import logoFondo from '../assets/logoGris2.png';

const Login = ({ onLogin }) => {
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://mysql.railway.internal:3306/api/auth/login', { dni });
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    
    <div className="relative min-h-screen flex items-center justify-center bg-gray-200 overflow-hidden">
      <img
        src={logoFondo}
        alt="Logo"
        className="absolute top-0 left-0 w-full h-full object-contain opacity-100 blur-sm pointer-events-none z-0"
      />
      <form onSubmit={handleLogin} className="relative z-10 bg-white bg-opacity-90 p-8 rounded shadow-md w-100">
        <h1 className="text-3xl font-bold mb-1 text-center">G & W</h1>
        <p className='mb-4 text-center'>Para visualizar su imágen por favor ingrese su DNI. En caso de no poder ingresar por favor comuniquese con nuestro consultorio</p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Ingrese su DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
