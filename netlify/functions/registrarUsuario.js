
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();


export default async (req, context) => {
    console.log("DENTRO registrarUsuario!")

    const contenido = await req.json();

    username = contenido['username'];
    email = contenido['email'];
    contrasenya = contenido['password'];

    try {
        const database = (await clientPromise).db('appHorario');
        const collection = database.collection('users');
        console.log("c!")

        const usuario = {
            email: email.toString(),
            username: username.toString(),
            password: password.toString(),
            soyAdmin: false,
            horarios: []
        }

        const result = await collection.insertOne(usuario);

        clientPromise.close();  // Close connection to avoid timeout

        if (result['acknowledged'] == true) {
            console.log("Usuario introducido");
            const myBlob = new Blob(JSON.stringify({ executed: true}),
                                    {type: "application/json",});
            const myOptions = { status: 200, statusText: "OK" };
            return new Response(myBlob, myOptions);
        } else {
            console.log("Usuario no actualizado");
            const myBlob = new Blob(JSON.stringify({ executed: false}),
                                    {type: "application/json",});
            const myOptions = { status: 200, statusText: "OK" };
            return new Response(myBlob, myOptions);
        }

    } catch (error) {
        clientPromise.close();  // Close connection to avoid timeout

        const myBlob = new Blob(JSON.stringify({ executed: false}),
                                    {type: "application/json",});
        const myOptions = { status: 500, statusText: error.toString() };
        return new Response(myBlob, myOptions);
    }
};
