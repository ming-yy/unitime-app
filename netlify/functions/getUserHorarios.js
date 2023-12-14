const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();

export default async (req, context) => {
    console.log("DENTRO!");

    const contenido = await req.json();
    console.log(contenido);

    const _id = contenido['_id'];
    console.log(_id);

    try {
        const database = (await clientPromise).db('appHorario');
        const collection = database.collection('horarios');

        const horario = await collection.findOne({_id: new ObjectId(_id)}, function (err, result) {
            if (err) {
                const myBlob = new Blob();
                const myOptions = { status: 500, statusText: err.toString() };
                throw new Response(myBlob, myOptions);
            };
            console.log(result.name);
            //database.close();
        });

        console.log("Horario found:", horario);

        if (horario) {
            return new Response(JSON.stringify(horario), { status: 200 });
        } else {
            return new Response("Horario not found", { status: 404 });
        }

    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(error.toString(), { status: 500 });
    }
};
