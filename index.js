const fs = require('fs');
//const fs = require('express');
const express = require('express');
//const uuid = require('uuid/v4');
const app = express();
const PORT = process.env.PORT || 3001;
const modelo = require ("./servidor/modelo.js");

let juego = new modelo.Juego();


app.use(express.static(__dirname + "/"));

app.get("/", function(request,response){
	var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/agregarUsuario/:nick",function(request,response){
  let nick = request.params.nick;
  let res;
  res=juego.agregarUsuario(nick);
  response.send(res);
});

app.get("/crearPartida/:nick",function(request,response){
  let nick = request.params.nick;
  let res = juego.jugadorCreaPartida(nick);

  /*let usr  = juego.usuarios[nick]
  if(usr){
    codigo=usr.crearPartida();
    res = {codigo:codigo};
  }*/  //Hecho asi al principio por poner la logica aqui que no deberia

  response.send(res);
});

app.get("/unirseAPartida/:codigo/:nick",function(request,response){
  let nick = request.params.nick;
  let codigo = request.params.codigo;
  let res = juego.jugadorSeUneAPartida(codigo,nick)
  response.send(res);
})

app.get("/obtenerPartidas",function(request,response){

  let lista = juego.obtenerPartidas();
  
  response.send(lista);
})

app.get("/obtenerPartidasDisponibles",function(request,response){

  let lista = juego.obtenerPartidasDisponibles();
  
  response.send(lista);
})

// Start the server
app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Press Ctrl+C para salir.');
});
// [END gae_flex_quickstart]