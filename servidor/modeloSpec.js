let modelo=require("./modelo.js");

const SIZE = 10

describe("El juego...", function() {
  var miJuego;
  var us1,us2,partida;

  beforeEach(function() {   //Se ejecuta antes de cada bloque it
    miJuego=new modelo.Juego(true);
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    let res=miJuego.jugadorCreaPartida("pepe");
    miJuego.jugadorSeUneAPartida("luis",res.codigo);
    us1=miJuego.obtenerUsuario("pepe");
    us2=miJuego.obtenerUsuario("luis");
    partida=miJuego.obtenerPartida(res.codigo);
  });

  it("inicialmente", function(){
    expect(us1.nick).toEqual("pepe");
    expect(us2.nick).toEqual("luis");

    //comprobar que los usuarios están en la partida
    //comprobar que cada usuario tiene 2 tableros de 5x5
    //que contienen agua (esAgua())
    //comprobar que cada usuario tiene 1 flota de 2 barcos
    //de tamaño 4 y 2
    //comprobar que la partida esta en fase jugando
  });

  it("luis y pepe están en la partida",function(){
    expect(partida.estoy("pepe")).toEqual(true);
    expect(partida.estoy("luis")).toEqual(true);
  });

  it("los dos jugadores tienen tablero propio y rival",function(){
    expect(us1.tableroPropio).toBeDefined();
    expect(us2.tableroPropio).toBeDefined();
    expect(us1.tableroRival).toBeDefined();
    expect(us2.tableroRival).toBeDefined();

    expect(us1.tableroPropio.casillas.length).toEqual(SIZE);
    expect(us2.tableroPropio.casillas.length).toEqual(SIZE);

    //habría que recorrer las 5 columnas
    for(x=0;x<5;x++){
      expect(us1.tableroPropio.casillas[x].length).toEqual(SIZE);
    }
  //  expect(us2.tableroPropio.casillas[0].length).toEqual(5);
    
    //habría que recorrer todo el tablero
    for(x=0;x<10;x++){ //us1.tableroPropio.casillas.length
      for(y=0;y<10;y++){//us1.tableroPropio.casillas[x].length
        expect(us1.tableroPropio.casillas[x][y].contiene.nombre).toEqual("agua");
      }
    }
  });

  it("los dos jugadores tienen flota (2 barcos, tam 2 y 4)",function(){
    expect(us1.flota).toBeDefined();
    expect(us2.flota).toBeDefined();
    
    //expect(us1.flota.length).toEqual(2);  //da fallo porq es un array asociativo
    expect(Object.keys(us1.flota).length).toEqual(2); //seria asi
    expect(Object.keys(us2.flota).length).toEqual(2);
    
    //expect(us1.flota[0].tam).toEqual(2); //aqui igual
    expect(us1.flota["b2"].tam).toEqual(2);
    expect(us1.flota["b4"].tam).toEqual(4);
  });

  it("la partida está en fase desplegando",function(){
    expect(partida.esJugando()).toEqual(false);
    expect(partida.esDesplegando()).toEqual(true); //Este metodo no lo tenemos
  })

  describe("Barcos fuera de limites",function(){
    beforeEach(function(){ 
      us1.colocarBarco("b2",9,9); // no cabe
	    us1.colocarBarco("b4",9,7); // no cabe
	    us1.barcosDesplegados();
	    us2.colocarBarco("b2",7,7);// Este si deberia el resto no 7,7 8,7
	    us2.colocarBarco("b4",9,9);// no cabe
	    us2.barcosDesplegados();    
    });

    it("Comprobar que no se puede colocar barcos fuera de los limites",function(){
      barco2us1=us1.obtenerBarcoDesplegado("b2");
      barco4us1=us1.obtenerBarcoDesplegado("b4");
      barco2us2=us2.obtenerBarcoDesplegado("b2");
      barco4us2=us2.obtenerBarcoDesplegado("b4");
      expect(us1.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
      expect(us1.tableroPropio.casillas[9][7].contiene.nombre).toEqual("agua");
      expect(us2.tableroPropio.casillas[7][7].contiene).toEqual(barco2us2);//En estos dos si deberian de estar
      expect(us2.tableroPropio.casillas[8][7].contiene).toEqual(barco2us2);
      expect(us2.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
    })
  })

  describe("A jugar!",function(){
    beforeEach(function(){ //Como esta anidado, el beforeEach de arriba tambien se hace
      us1.colocarBarco("b2",0,0); // 0,0 1,0
	    us1.colocarBarco("b4",0,1); // 0,1 1,1 2,1 3,1
	    us1.barcosDesplegados();
	    us2.colocarBarco("b2",3,3);// 3,3 4,3
	    us2.colocarBarco("b4",4,4);// 4,4 5,4 6,4 7,4
	    us2.barcosDesplegados();    
    });

    it("Comprobar que los barcos estan bien colocados",function(){
      barco2us1=us1.obtenerBarcoDesplegado("b2");
      barco4us1=us1.obtenerBarcoDesplegado("b4");
      barco2us2=us2.obtenerBarcoDesplegado("b2");
      barco4us2=us2.obtenerBarcoDesplegado("b4");

      expect(us1.tableroPropio.casillas[0][0].contiene).toEqual(barco2us1);
      expect(us1.tableroPropio.casillas[1][0].contiene).toEqual(barco2us1);
      expect(us1.tableroPropio.casillas[0][1].contiene).toEqual(barco4us1);
      expect(us1.tableroPropio.casillas[1][1].contiene).toEqual(barco4us1);
      expect(us1.tableroPropio.casillas[2][1].contiene).toEqual(barco4us1);
      expect(us1.tableroPropio.casillas[3][1].contiene).toEqual(barco4us1);
      expect(us2.tableroPropio.casillas[3][3].contiene).toEqual(barco2us2);
      expect(us2.tableroPropio.casillas[4][3].contiene).toEqual(barco2us2);
      expect(us2.tableroPropio.casillas[4][4].contiene).toEqual(barco4us2);
      expect(us2.tableroPropio.casillas[5][4].contiene).toEqual(barco4us2);
      expect(us2.tableroPropio.casillas[6][4].contiene).toEqual(barco4us2);
      expect(us2.tableroPropio.casillas[7][4].contiene).toEqual(barco4us2);


    })


    it("Comprobar que las flotas estan desplegadas",function(){ //metodos todosDesplegados...
      expect(us1.todosDesplegados()).toEqual(true);
      expect(us2.todosDesplegados()).toEqual(true);

    });

    it("Comprobar jugada que Pepe gana",function(){
      expect(us2.flota["b2"].obtenerEstado()).toEqual("intacto");
      expect(us2.flota["b4"].obtenerEstado()).toEqual("intacto");
      us1.disparar(3,3);
      expect(us2.flota["b2"].obtenerEstado()).toEqual("tocado");
	    us1.disparar(4,3);
      expect(us2.flota["b2"].obtenerEstado()).toEqual("hundido");
      expect(us2.flota["b4"].obtenerEstado()).toEqual("intacto");
	    us1.disparar(4,4);
      expect(us2.flota["b4"].obtenerEstado()).toEqual("tocado");
	    us1.disparar(5,4);
	    us1.disparar(6,4);
	    us1.disparar(7,4);
      expect(us2.flota["b4"].obtenerEstado()).toEqual("hundido");
      expect(us2.flotaHundida()).toEqual(true);
      expect(us1.flotaHundida()).toEqual(false);



    });

    it("Comprobar el cambio de turno",function(){ //Comprobar también que no cambia de turno si acierta
      expect(partida.turno).toEqual(us1);
      us1.disparar(2,2);
      expect(partida.turno).toEqual(us2);


    });

    it("Comprobar que no deja disparar si no es tu turno",function(){
      expect(partida.turno).toEqual(us1);
      expect(us1.flota["b2"].obtenerEstado()).toEqual("intacto");
      us2.disparar(0,0);
      expect(us1.flota["b2"].obtenerEstado()).toEqual("intacto");

    });

  });

});
