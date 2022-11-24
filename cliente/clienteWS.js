function ClienteWS(){
    this.socket;

    //enviar peticiones
    this.conectar = function(){ //Peticion de conexion
        this.socket=io();
        this.servidorWS(); //En el momento que mando la peticion de conexion, me pongo a escuchar
    }

    this.crearPartida = function(){ //Esto lo enviara al servidorWS, que lo recoge en un bloque "socket.on"
        this.socket.emit("crearPartida",rest.nick); //Emit para enviar peticiones+una cadena y el atributo
    }

    this.unirseAPartida = function(codigo){
        this.socket.emit("unirseAPartida",rest.nick,codigo);
    }
    this.abandonarPartida=function(){
		this.socket.emit("abandonarPartida",rest.nick,cws.codigo);
	}

    this.colocarBarco=function(nombre,x,y){
        this.socket.emit("colocarBarco",rest.nick,nombre,x,y)
    }
    this.barcosDesplegados=function(){
        this.socket.emit("barcosDesplegados",rest.nick)
    }
    this.disparar=function(x,y){
        this.socket.emit("disparar",rest.nick,x,y)
    }


    //gestionar peticiones

    this.servidorWS=function(){
        let cli=this; //Esto lo hacemos por js para no confundir el this con tantos callbacks

        this.socket.on("partidaCreada",function(data){
            console.log(data);
            if(data.codigo!=-1){
                console.log("Partida creada por "+rest.nick + " con codigo "+ data.codigo);
                iu.mostrarCodigo(data.codigo);
                cli.codigo=data.codigo;
				
            }
            else{
                console.log("No se ha podido crear la partida");
                iu.mostrarModal("No se ha podido crear partida");
				iu.mostrarCrearPartida();
                rest.comprobarUsuario();
            }

        });

        this.socket.on("unidoAPartida",function(data){
            if (data.codigo!=-1){
				console.log("Usuario "+rest.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);
                cli.codigo=data.codigo;	
			}
			else{
				console.log("No se ha podido unir a partida")
				
			}
        });

        this.socket.on("actualizarListaPartidas",function(lista){
			if (!cli.codigo){
				iu.mostrarListaDePartidasDisponibles(lista);
			}
		});

        this.socket.on("partidaAbandonada",function(data){
			if (data.codigo!=-1){
                console.log(data.nombreA+" ha abandonado la partida con codigo: "+data.codigoP+"\n"+" Ha ganado "+data.nombreG)
				iu.mostrarHome();
                iu.mostrarModal(data.nombreA+" ha abandonado la partida con codigo: "+data.codigoP+"\n"+" Ha ganado "+data.nombreG);
			}
            else{
                console.log("No se ha podido abandonar la partida");
                iu.mostrarModal(data.nombreA+" ha intentado abandonar la partida pero no ha podido"); 
            }
		});


        
        this.socket.on("aJugar",function(){
			iu.mostrarModal("A jugaaar!");
		});

        this.socket.on("barcoColocado",function(data){
            console.log(data.colocado)
            if (data.colocado) {
                let barco = tablero.flota[data.barco];
                tablero.puedesColocarBarco(barco,data.x,data.y);
                iu.mostrarModal("El barco: "+ data.barco + " se ha colocado")
            }
            else {
                iu.mostrarModal("No se puede colocar barco")
            }
        })

        this.socket.on("disparo",function(data){
            iu.mostrarModal("El jugador: "+data.jugador + " ha disparado en la posicion "+ data.disparoX+ " " +data.disparoY)
        })

        this.socket.on("partidaTerminada", function () {
            iu.mostrarModal("La partida ha terminado");
        });

        this.socket.on("noEsTuTurno", function (data) {
            iu.mostrarModal("No puedes disparar no es tu turno");
        });

        this.socket.on("faseDesplegando", function (data) {
            tablero.flota = data.flota;
            //tablero.mostrar(true)
            // tablero.mostrarFlota(); //data.flota();
            console.log("Ya puedes desplegar la flota");
        });


    }


}
