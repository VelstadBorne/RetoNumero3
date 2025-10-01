const express = require('express')
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT||3000,() => {
  console.log(`Servidor corriendo en el puerto 3000`)
});

module.exports = app;