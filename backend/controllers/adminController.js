const User = require('../models/User');
const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar imágenes .png
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos .png'), false);
  }
};

const upload = multer({ storage, fileFilter });

exports.createUser = async (req, res) => {
  const { nombre, apellido, dni, telefono, rol } = req.body;
  try {
    const newUser = await User.create({ nombre, apellido, dni, telefono, rol });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

exports.uploadImage = [
  upload.single('image'),
  async (req, res) => {
    const { dni } = req.body;
    try {
      const user = await User.findOne({ where: { dni } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const newImage = await Image.create({
        filename: req.file.filename,
        user_id: user.id
      });
      res.status(201).json({ message: 'Imagen subida correctamente', image: newImage });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      res.status(500).json({ message: 'Error al subir imagen', error: error.message });
    }
  }
];
