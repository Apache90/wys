const User = require('../models/User');
const Image = require('../models/Image');

exports.getUserImages = async (req, res) => {
  const { dni } = req.params;
  try {
    const user = await User.findOne({ where: { dni } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const images = await Image.findAll({ where: { user_id: user.id } });

    const base64Images = images.map(img => ({
      id: img.id,
      upload_date: img.upload_date,
      filename: img.filename,
      base64: `data:${img.mimetype};base64,${img.image.toString('base64')}`,
    }));

    res.json({ images: base64Images });
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(500).json({ message: 'Error al obtener imágenes' });
  }
};
