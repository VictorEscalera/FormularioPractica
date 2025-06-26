require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || '';

// Conexión a MongoDB con logging
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
    process.exit(1); // Cerrar la app si no conecta
  });

// Esquema y modelo
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: email,
  carrera: String,
  telefono: Number,
  fecha: Date,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta POST /enviar
app.post('/enviar', async (req, res) => {
  try {
    console.log('📩 Datos recibidos:', req.body);

    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();

    res.json({ mensaje: '✅ Datos guardados en MongoDB Atlas' });
  } catch (error) {
    console.error('❌ Error guardando usuario:', error);
    res.status(500).json({ mensaje: '❌ Error al guardar datos', error: error.message });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
