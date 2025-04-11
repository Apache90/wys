const User = require('../models/User');
const Image = require('../models/Image');
const multer = require('multer');

// Almacenar imágenes en memoria (no en disco)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') cb(null, true);
  else cb(new Error('Solo se permiten archivos .png'), false);
};

const upload = multer({ storage, fileFilter });

async function createUser(req, res) {
  const { nombre, apellido, dni, telefono, rol } = req.body;
  try {
    const existing = await User.findOne({ where: { dni } });
    if (existing) {
      return res.status(400).json({ message: 'Este DNI ya está registrado.' });
    }
    const newUser = await User.create({ nombre, apellido, dni, telefono, rol });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
}

const uploadImage = [
  upload.single('image'),
  async (req, res) => {
    const { dni } = req.body;
    try {
      const user = await User.findOne({ where: { dni } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const newImage = await Image.create({
        user_id: user.id,
        image: req.file.buffer,
        filename: req.file.originalname,
        mimetype: req.file.mimetype
      });

      res.status(201).json({ message: 'Imagen subida correctamente', image: newImage });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      res.status(500).json({ message: 'Error al subir imagen', error: error.message });
    }
  }
];

module.exports = {
  createUser,
  uploadImage
};
