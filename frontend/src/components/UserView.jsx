import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserView = ({ user, onLogout }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${user.dni}/images`);
        setImages(res.data.images);
      } catch (error) {
        console.error('Error al obtener imágenes:', error);
      }
      setLoading(false);
    };
    fetchImages();
  }, [user.dni]);

  const handleDownload = async (filename) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/uploads/${filename}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando imágenes...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bienvenido, {user.nombre}</h2>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cerrar sesión
        </button>
      </div>
      <div className="mb-4">
        <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
        <p><strong>DNI:</strong> {user.dni}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
      </div>
      <h3 className="text-xl font-semibold mb-2">Imágenes Disponibles</h3>
      <ul className="space-y-4">
        {images.map((img) => (
          <li key={img.id} className="border p-4 rounded">
            <p>{new Date(img.upload_date).toLocaleDateString()}</p>
            <img
              src={`http://localhost:5000/uploads/${img.filename}`}
              alt="Imagen subida"
              className="mt-2 max-w-full h-auto"
            />
            <button
              onClick={() => handleDownload(img.filename)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mt-2 inline-block"
            >
              Descargar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
