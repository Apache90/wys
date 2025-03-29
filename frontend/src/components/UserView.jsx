import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserView = ({ user }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Se asume que existe un endpoint para obtener las imágenes asociadas al usuario
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${user.dni}/images`);
        setImages(res.data.images);
      } catch (error) {
        console.error('Error al obtener imágenes');
      }
    };
    fetchImages();
  }, [user.dni]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Bienvenido, {user.nombre}</h2>
      <div className="mb-4">
        <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
        <p><strong>DNI:</strong> {user.dni}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
      </div>
      <h3 className="text-xl font-semibold mb-2">Imágenes Disponibles</h3>
      <ul className="space-y-4">
        {images.map((img) => (
          <li key={img.id} className="border p-4 rounded flex justify-between items-center">
            <span>{new Date(img.upload_date).toLocaleDateString()}</span>
            <a
              href={`http://localhost:5000/uploads/${img.filename}`}
              download
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              Descargar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
