const User = require('../models/User');

exports.login = async (req, res) => {
  const { dni } = req.body;
  try {
    console.log("Buscando usuario con DNI:", dni);
    const user = await User.findOne({ where: { dni } });
    console.log("Resultado de la búsqueda:", user);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no registrado' });
    }
    
    res.json({ 
      message: 'Login exitoso', 
      user: { 
        id: user.id, 
        nombre: user.nombre, 
        apellido: user.apellido, 
        dni: user.dni, 
        telefono: user.telefono, 
        rol: user.rol 
      } 
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
