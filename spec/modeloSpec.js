describe("El juuego...", function() {
  var miJuego;
  

  beforeEach(function() { //Esta parte se ejecuta antes de cada test
    miJuego=new Juego();
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    usr1=miJuego.usuarios["pepe"];
    usr2=miJuego.usuarios["luis"];
    
    
  });

  it("inicialmente", function() {  //Cada fragmento "it" son los test
    let lista=miJuego.obtenerPartidas();//Pongo operaciones de mi logica
    expect(lista.length).toEqual(0);   //Expect es lo que espera
    expect(usr1.nick).toEqual("pepe");
    expect(usr2.nick).toEqual("luis");

  });
  it("creacion de partida", function(){
    
    let codigo1=usr1.crearPartida();
    let listaPartidas= miJuego.obtenerPartidas()
    expect(miJuego.partidas[codigo]).toBeDefined();
    expect(listaPartidas.length).toEqual(1);

    usr2.crearPartida();
    listaPartidas= miJuego.obtenerPartidas()
    expect(listaPartidas.length).toEqual(2);

    //let dueño= partida1.owner;
    //expect(dueño).toEqual("pepe");

    let partida=miJuego.partidas[codigo1]
    

  })
});
