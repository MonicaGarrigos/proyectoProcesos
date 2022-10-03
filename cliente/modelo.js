function Juego(){
    this.partidas={};  
    this.usuarios={}; //array asociativo (diccionario clave/valor)

    this.agregarUsuario=function(nick){
        let res={nick:-1};
        if(!this.usuarios[nick]){
            this.usuarios[nick]= new Usuario(nick,this); //al crear el usuario le paso el juego
            res={nick:nick};
			console.log("Nuevo usuario: "+nick);
        }
        return res;
    }

    this.eliminarUsuario=function(nick){
        delete this.usuarios[nick];
    }

    this.crearPartida=function(jugador){
        //obtener codigo
        //crear partida con propietario nick
        //devolver codigo
        let codigo=Date.now();
        this.partidas[codigo]= new Partida(codigo,jugador);
        console.log("partida creada");
        return codigo;

    }
    this.unirApartida=function(codigo,jugador){
        if (this.partidas[codigo]){//si existe o no
           this.partidas[codigo].agregarJugador(jugador); 
        }
        else{
            console.log("Partida no existe")
        }
    }
    this.obtenerPartidas=function(){
        let lista=[];
        for (let key in this.partidas){
            lista.push({codigo:key,owner:this.partidas[key].owner})
        }
        return lista;   
    }
    this.obtenerPartidasDisponibles=function(){
        //devolver solo las partidas que no estan completas
        //Para mostrarle al usuario solo las disponibles
        let lista=[];
        for (let key in this.partidas){
            if(this.partidas[key].jugadores.length<2){
                lista.push({codigo:key,owner:this.partidas[key].owner})
            }
        }
        return lista; 
    }
}

function Usuario(nick,juego){
    this.nick=nick;
    this.juego=juego;
    this.crearPartida=function(){   //delego en juego
        return this.juego.crearPartida(this)
    }
    this.unirseApartida=function(codigo){
        this.juego.unirApartida(codigo,this);
    }

}

function Partida(codigo,jugador){
    this.codigo=codigo;
    this.owner=jugador;
    this.jugadores=[]; //array normal o asociativo??
    //this.maxJugadores=2;
    this.fase="inicial"; //new Inicial() si decido hacerlo con patron State, en el diagrama ambas opciones disponibles
    
    this.agregarJugador= function(jugador){  //modificado para que se agregue el jugador entero no solo el nick
        if(this.jugadores.length < 2){
            this.jugadores.push(jugador);
        }
        else {
            console.log("partida completa")
        }
    }
    this.agregarJugador(this.owner);
}