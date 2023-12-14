
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();


export default async (req, context) => {
    console.log("DENTRO!")

    const contenido = await req.json();
    console.log(contenido);
    
    email = contenido['email'];
    password = contenido['password'];
    console.log(email);
    console.log(password);
    
    try {
        console.log("a!")
        const database = (await clientPromise).db('appHorario');
        console.log("b!")
        const collection = database.collection('users');
        console.log("c!")
        
        // Actualizar el usuario
        const result = await collection.updateOne(
            { email: email.toString() },
            { $set: { password: password.toString() } }
        );

        // You can check the result to see if the update was successful
        if (result.modifiedCount === 1) {
            console.log("Usuario actualizado");
            return true;
        } else {
            console.log("Usuario no actualizado");
            return false;
        }

    } catch (error) {
        //database.close();      // Close connection to database to close function
        const myBlob = new Blob();
        const myOptions = { status: 500, statusText: error.toString() };
        return new Response(myBlob, myOptions);
    }
};
