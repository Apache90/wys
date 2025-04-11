import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = ({ onLogout }) => {
  const [form, setForm] = useState({ nombre: '', apellido: '', dni: '', telefono: '', rol: 'paciente' });
  const [message, setMessage] = useState('');
  const [dniSearch, setDniSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/create-user', form);
      setMessage('Usuario creado con éxito');
      setForm({ nombre: '', apellido: '', dni: '', telefono: '', rol: 'paciente' });
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al crear usuario';
      setModalMessage(msg);
      setShowModal(true);
    }
  };

  const handleSearchUser = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { dni: dniSearch });
      setSelectedUser(res.data.user);
    } catch {
      setMessage('Usuario no encontrado');
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    const formData = new FormData();
    formData.append('dni', selectedUser.dni);
    formData.append('image', image);
    try {
      await axios.post('http://localhost:5000/api/admin/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Imagen subida correctamente');
    } catch {
      setMessage('Error al subir la imagen');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Panel de Administrador</h2>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cerrar sesión
        </button>
      </div>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Crear Usuario</h3>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="DNI"
            value={form.dni}
            onChange={(e) => setForm({ ...form, dni: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <select
            value={form.rol}
            onChange={(e) => setForm({ ...form, rol: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="paciente">Paciente</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Crear Usuario
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Buscar Usuario por DNI</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ingrese DNI"
            value={dniSearch}
            onChange={(e) => setDniSearch(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={handleSearchUser} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Buscar
          </button>
        </div>
        {selectedUser && (
          <div className="mt-4 p-4 border rounded">
            <p><strong>{selectedUser.nombre} {selectedUser.apellido}</strong></p>
            <p>DNI: {selectedUser.dni}</p>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Subir Imagen para Usuario</h3>
        <form onSubmit={handleUploadImage} className="flex flex-col space-y-4">
          <input
            type="file"
            accept=".png"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            Subir Imagen
          </button>
        </form>
      </section>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-semibold mb-2">Aviso</h3>
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
