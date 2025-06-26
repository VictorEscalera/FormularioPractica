// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());               // Permite CORS para cualquier origen (ajusta en producción)
app.use(express.json());       // Parsear JSON

// Conexión a MongoDB Atlas usando variable de entorno
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ Error de conexión:', err);
    process.exit(1);
  });

// Modelo Mongoose
const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: email, required: true },
  carrera: String,
  telefono: Number,
  fecha: Date,
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta POST para guardar datos
app.post('/enviar', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: '✅ Datos guardados correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar:', error);
    res.status(500).json({ mensaje: '❌ Error al guardar datos', error: error.message });
  }
});

// Puerto dinámico para Render o local
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
