function ServidorWS(){

    //enviar peticiones



    //gestionar peticiones
    this.lanzarServidorWS = function(io,juego){

        io.on('connection',socket(juego))

    }

}

module.exports.ServidorWS=ServidorWS;