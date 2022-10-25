function ServidorWS(){

    //enviar peticiones

    this.enviarAlRemitente=function(socket,mensaje,datos){  //Para contestar solo al que hace la peticion, abra otros de broadcast
		socket.emit(mensaje,datos);
	}

    this.enviarATodosEnPartida=function(io,codigo,mensaje,datos){
		io.sockets.in(codigo).emit(mensaje,datos)
	}







    //gestionar peticiones
    this.lanzarServidorWS = function(io,juego){
        let cli=this;

        io.on('connection', (socket) => {
            console.log('Usuario conectado');

            socket.on("crearPartida",function(nick){ //Al igual que con rest, la idea es evitar la logica en la capa WS
                let res = juego.jugadorCreaPartida(nick);
                socket.join(res.codigo);
                cli.enviarAlRemitente(socket,"partidaCreada",res);

            });

            socket.on("unirseAPartida",function(nick,codigo){
                let res= juego.jugadorSeUneAPartida(nick,codigo);
                cli.enviarAlRemitente(socket,"unidoAPartida",res);
                socket.join(codigo);
                //Comprobar que la partida puede comenzar
                let partida = juego.obtenerPartida(codigo);
                if(partida.fase.esJugando()){
                    cli.enviarATodosEnPartida(io,codigo,"aJugar",{});
                }
            })

          });

    }

}

module.exports.ServidorWS=ServidorWS;