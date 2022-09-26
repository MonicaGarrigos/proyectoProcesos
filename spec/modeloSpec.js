describe("El juego...", function() {
  var miJuego;
  

  beforeEach(function() { //Esta parte se ejecuta antes de cada test
    miJuego=new Juego();
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    miJuego.agregarUsuario("zacarias");
    usr1=miJuego.usuarios["pepe"];
    usr2=miJuego.usuarios["luis"];
    usr3=miJuego.usuarios["zacarias"];
    
    
  });

  it("inicialmente", function() {  //Cada fragmento "it" son los test
    let lista=miJuego.obtenerPartidas();//Pongo operaciones de mi logica
    expect(lista.length).toEqual(0);   //Expect es lo que espera
    expect(usr1.nick).toEqual("pepe");
    expect(usr2.nick).toEqual("luis");

  });
  it("creacion de partida", function(){
    
    let codigo= usr1.crearPartida();
    expect(miJuego.partidas[codigo]).toBeDefined();
    let partida=miJuego.partidas[codigo];
    expect(partida.owner).toEqual(usr1.nick);
    expect(partida.jugadores[0]).toEqual(usr1.nick);
    expect(partida.codigo).toEqual(codigo);
    usr2.unirseApartida(codigo);
    expect(partida.jugadores.length).toEqual(2);
    usr3.unirseApartida(codigo);
    expect(partida.jugadores.length).toEqual(2);
  })
});
