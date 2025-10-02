// backend/index.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
  {
    id: 1,
    username: "alan",
    password: "12345",
  },
  {
    id: 2,
    username: "",
    password: "",
  }
];



app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'El usuario y la contraseña son requeridos' });
    }

    
    const user = users.find(u => u.username === username);
    if (!user) {

      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

  
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

   
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'ESTA_ES_MI_CLAVE_SECRETA_REEMPLAZAR_EN_PRODUCCION',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,
      username: user.username,
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});