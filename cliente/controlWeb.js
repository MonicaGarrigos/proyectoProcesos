function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        var cadena = '<div class="row" id="mAU">';//'<form class="form-row needs-validation"  id="mAU">';
        cadena = cadena + '<div class="col"><h2>El juego indefinido</h2></div>';
        cadena = cadena + '<div class="row">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required></div>';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar sesión</button>';
        //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
        cadena = cadena + '</div></div>'; //' </form>';
        cadena = cadena + '<div id="nota"></div></div></div>';


        $("#agregarUsuario").append(cadena);
        //$("#nota").append("<div id='aviso' style='text-align:right'>Inicia sesión con Google para jugar</div>");    

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) {
                e.preventDefault();
                $('#nota').append('Nick inválido');
            }
            else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                $("#aviso").remove();
                rest.agregarUsuario(nick);



            }

        })
    }

    this.mostrarHome = function () {

        $("#mH").remove();

        var cadena = '<div class="row" id="mH">';
        cadena = cadena + '<div class="row col-12" ><h2>El juego indefinido</h2></div>';
        cadena = cadena + "<div><p> Bienvenido " + rest.nick + "</p></div>"
        cadena = cadena + '<div id="codigo"></div>'
        cadena = cadena + '</div>'


        $('#mostrarHome').append(cadena);

    }

    this.mostrarCrearPartida = function () {
        //dibujar un boton que al hacer click llame a crear partida de rest

        let cadena = '<div class="row" id="mCP">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<button id="btnCP" class="btn btn-primary mb-2 mr-sm-2">Crear Partida</button>';
        cadena = cadena + '</div>'
        cadena = cadena + '</div>'

        $('#mostrarCP').append(cadena);

        $("#btnCP").on("click", function (e) {
            $('#mostrarCP').remove();
            rest.crearPartida(rest.nick);
        })


    }

    this.mostrarCodigo = function (codigo) {
        let cadena = " Codigo de la partida: " + codigo;
        $('#codigo').append(cadena);
    }

    //No se como pasarle la lista por parametro

    this.mostrarListaPartidas = function (lista) {
        //crear un control visual tipo lista para mostrar la lista de partidas

        $("#mLP").remove();

        let cadena = '<div class="row" id="mLP"><h2>Lista de Partidas</h2>'
        cadena = cadena + '<br>'
        cadena = cadena + '<ul class="list-group">'
        for(i=0;i<lista.length;i++){
        cadena = cadena + '<li class="list-group-item">'+lista[i].codigo+"  "+ lista[i].owner+'</li>'
        }
       
        cadena = cadena + '</ul>'
        cadena = cadena + '</div>'

        $('#mostrarLP').append(cadena);

    }







    //(Jquery)Con almohadilla busca el id en el html, con punto buscará la clase, sin nada buscara los contenidos de la etiqueta
    //para eliminar: $('#mAU).remove()



}