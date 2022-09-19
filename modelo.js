function Juego(){
    this.partidas=[];  //Con un array asociativo podría forzar que no se repita el nombre, de momento se queda normal
    this.agregarPartida= function(nombre){
        this.partidas.push(new Partida(nombre))
    }
    this.eliminarPartida = function(nombre){
        //TO DO
    }
    this

}

function Partida(nombre){
    this.nombre=nombre;

}