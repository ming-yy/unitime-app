const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();

export default async (req, context) => {
    console.log("DENTRO!");

    const contenido = await req.json();
    console.log(contenido);

    const code = contenido['codigo'];
    console.log(code);

    try {
        const database = (await clientPromise).db('appHorario');
        const collection = database.collection('asignaturas');
        const semanaCollection = database.collection('semanas')

        const asignaturas = await collection.findOne({codigo: code}, function (err, result) {
            if (err) {
                const myBlob = new Blob();
                const myOptions = { status: 500, statusText: err.toString() };
                throw new Response(myBlob, myOptions);
            };
            console.log(result.name);
            //database.close();
        });

        semanaId = new ObjectId(asignaturas['horas']);

        const semana = await semanaCollection.findOne({_id: semanaId}, function (err, result) {
            if (err) {
                const myBlob = new Blob();
                const myOptions = { status: 500, statusText: err.toString() };
                throw new Response(myBlob, myOptions);
            };
            console.log(result.name);
            //database.close();
        });

        console.log("Semana found:", semana);

        if (semana) {
            return new Response(JSON.stringify(semana), { status: 200 });
        } else {
            return new Response("Asignaturas not found", { status: 404 });
        }

    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(error.toString(), { status: 500 });
    }
};
