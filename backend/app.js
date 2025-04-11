const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoutes);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Sincronizar modelos y arrancar el servidor
sequelize.sync()
  .then(() => {
    console.log('Conectado a la base de datos');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error de conexión:', err));

module.exports = app;
