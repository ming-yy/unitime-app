const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();

export default async (req, context) => {
    console.log("DENTRO de getUsuario!");

    const contenido = await req.json();

    const email = contenido['email'];

    try {
        const database = (await clientPromise).db('appHorario');
        const collection = database.collection('users');

        const usuario = await collection.findOne({email: email.toString()});

        console.log("Usuario found:", usuario);
        
        mongoClient.close();  // Close connection to avoid timeout

        if (usuario) {
            const myBlob = new Blob(JSON.stringify({ executed: true, user: usuario}),
                                {type: "application/json",});
            const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
            return new Response(myBlob, myOptions);
        } else {
            const myBlob = new Blob(JSON.stringify({ executed: true, user: usuario}),
                                {type: "application/json",});
            const myOptions = { status: 404, statusText: "User not found" };
            return new Response(myBlob, myOptions);
        }

    } catch (error) {
        console.error("Error occurred:", error);
        mongoClient.close();  // Close connection to avoid timeout

        const myBlob = new Blob(JSON.stringify({ executed: false, user: null}),
                                {type: "application/json",});
        const myOptions = { status: 500, statusText: error.toString() };
        return new Response(myBlob, myOptions);
    }
};
