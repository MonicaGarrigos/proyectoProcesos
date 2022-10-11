function ClienteRest(){
    this.nick;

    this.agregarUsuario=function(nick){
		var cli=this;
		$.getJSON("/agregarUsuario/"+nick,function(data){ //funcion getJSON de JQuery
            //Este data proviene de los response.send(res) del API REST(index.js), los campos deben ser iguales
			//se ejecuta cuando conteste el servidor, funcion de callback
			console.log(data);
			if (data.nick!=-1){
                console.log("Usuario " + data.nick + " registrado")
                cli.nick=data.nick;
				//ws.nick=data.nick;
				//$.cookie("nick",ws.nick);      Todo esto comentado lo usaremos mas tarde
				iu.mostrarHome();
                iu.mostrarCrearPartida();
                cli.obtenerListaPartidas();
                
			}
			else{
                console.log("No se ha podido registrar el usuario")
				//iu.mostrarModal("El nick ya está en uso");
				iu.mostrarAgregarUsuario();
                
			}
		})
        //Aqui aun no sabemos si ha contestado el servidor
        //Lo puesto aqui se ejecuta a la vez que la llamada, sin embargo en la parte de arriba en la funcion
        //de callback si estoy seguro(por si quiero poner algo que sepa seguro q tiene q ir despues)
	}

    this.crearPartida = function(){
        let cli=this;
        let nick=cli.nick;
        
        $.getJSON("/crearPartida/"+nick,function(data){
            console.log(data)
            if(data.codigo!=-1){
                console.log("Partida creada por "+nick + " con codigo "+ data.codigo)
                iu.mostrarCodigo(data.codigo);
            }
            else{
                console.log("No se ha podido crear la partida")
            }

        })


    }

    this.unirseAPartida = function(codigo,nick){
        let cli=this;

        $.getJSON("/unirseAPartida/"+codigo+"/"+nick,function(data){
            console.log(data)
            if(data.codigo!=-1){
                console.log("Jugador: "+nick+ " se ha unido a la partida con codigo: "+codigo)
            }
            else{
                console.log("No ha podido unirse a la partida")
            }


        })

    }

    this.obtenerListaPartidas = function (){ 
        $.getJSON("/obtenerPartidasDisponibles/",function(lista){
            iu.mostrarListaPartidas(lista);

        })

    }
    

    
}

//Lo de module.exports no se pone aqui al ser del cliente, ya que todo lo puesto aqui es global
//Los objetos del cliente(index.html,clienteRest,...) estan en el servidor y con la primera peticion de http el servidor los manda al cliente
//pero como los renderiza el cliente en el diagrama despliegue los ponemos en el navegador no en el servidor