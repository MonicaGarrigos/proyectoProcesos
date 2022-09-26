function Juego(){
    this.partidas={};  
    this.usuarios={}; //array asociativo (diccionario clave/valor)

    this.agregarUsuario=function(nick){
        if(!this.usuarios[nick]){
            this.usuarios[nick]= new Usuario(nick,this); //al crear el usuario le paso el juego
        }
    }

    this.eliminarUsuario=function(nick){
        delete this.usuarios[nick];
    }

    this.crearPartida=function(nick){
        //obtener codigo
        //crear partida con propietario nick
        //devolver codigo
        console.log("partida creada");

    }
}

function Usuario(nick,juego){
    this.nick=nick;
    this.juego=juego;
    this.crearPartida=function(){   //delego en juego
        this.juego.crearPartida(nick)
    }

}

function Partida(codigo){
    this.codigo=codigo;

}