var mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;



function Cad() {
    this.partidas;

    //partidas
    this.insertarPartida = function (partida, callback) {
        insertar(this.partidas, partida, callback);
    }


    function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });

    }


    this.conectar = function () {
        let cad = this;
        //mongodb+srv://batalla:<password>@cluster0.yzyhrzl.mongodb.net/?retryWrites=true&w=majority
        mongo.connect("mongodb+srv://batalla:batalla@cluster0.yzyhrzl.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true }, function (err, database) {
            if (!err) {
                console.log("Conectado a MongoDB Atlas");
                database.db("batalla").collection("partidas",function(err,col){
                if (err) {
                    console.log("No se puede obtener la coleccion")
                }
                else {
                    console.log("tenemos la colección partidas");
                    cad.partidas =col;
                }
            });

            }
            else {
                console.log("No se puedo conectar con MongoDB Atlas")
            }
        })

    }

    this.conectar();

}

module.exports.Cad = Cad;