const User = require('../models/User');
const Image = require('../models/Image');

exports.getUserImages = async (req, res) => {
  const { dni } = req.params;
  try {
    const user = await User.findOne({ where: { dni } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const images = await Image.findAll({ where: { user_id: user.id } });
    res.json({ images });
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(500).json({ message: 'Error al obtener imágenes' });
  }
};