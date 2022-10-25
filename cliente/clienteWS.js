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

    //gestionar peticiones

    this.servidorWS=function(){
        let cli=this; //Esto lo hacemos por js para no confundir el this con tantos callbacks

        this.socket.on("partidaCreada",function(data){
            console.log(data)
            if(data.codigo!=-1){
                console.log("Partida creada por "+data.nick + " con codigo "+ data.codigo)
                iu.mostrarCodigo(data.codigo);
				
            }
            else{
                console.log("No se ha podido crear la partida")
            }

        })

        this.socket.on("unidoAPartida",function(data){
            if (data.codigo!=-1){
				console.log("Usuario "+cli.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);	
			}
			else{
				console.log("No se ha podido unir a partida")
				
			}
        })

    }


}
