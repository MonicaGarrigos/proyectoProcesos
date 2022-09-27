'use strict';
const fs = require('express');
const express = require('express');
//const uuid = require('uuid/v4');
const app = express();

//HTTP GET POST PUT DELETE
/*

get "/"
get "/obtenerPartidas"
post get (depende de cuanta info le mande al server) "/agregarUsuario/:nick"
put "/actualizarPartida"
delete "/eliminarPartida"
...

*/

app.get('/', (req, res) => {
  res
    .status(200)
    .send("Hola")
    .end();
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Press Ctrl+C para salir.');
});
// [END gae_flex_quickstart]