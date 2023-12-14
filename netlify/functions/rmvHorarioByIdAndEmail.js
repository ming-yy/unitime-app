
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();


export default async (req, context) => {
    console.log("DENTRO!")

    const contenido = await req.json();
    console.log(contenido)
    
    _id = contenido['_id'];
    contrasenya = contenido['password'];
    console.log(email);
    console.log(contrasenya);
    
    try {
        const database = client.db('appHorario'); 
        const usersCollection = database.collection('users'); 
        const horariosCollection = database.collection('horarios'); 
        const misAsigCollection = database.collection('misAsignaturas'); 

        const horarioId = new ObjectId(_id);

        const horario = await collection.findOne({_id: horarioId}, function (err, result) {
            if (err) {
                const myBlob = new Blob();
                const myOptions = { status: 500, statusText: err.toString() };
                throw new Response(myBlob, myOptions);
            };
            console.log(result.name);
            //database.close();
        });

        const misAsigId = new ObjectId(horario['misAsignaturas']);

        await horariosCollection.deleteOne(
            { _id: horarioId }
        )

        await misAsigCollection.deleteOne(
            { _id: misAsigId }
        )

        // Update the user document
        const result = await usersCollection.updateOne(
            { email: email },
            { $pull: { horarios: horarioId } }
        );

        if (result.modifiedCount === 0) {
            console.log("No document found or no changes made.");
        } else {
            console.log("Horario removed successfully.");
        }

        return result;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
