
    const { MongoClient } = require("mongodb");

    const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

    const mongoClient = new MongoClient(url);
    const clientPromise = mongoClient.connect();


    export default async (req, context) => {
        console.log("DENTRO!")

        const contenido = await req.json();
        console.log(contenido)
        
        email = contenido['email'];
        contrasenya = contenido['password'];
        console.log(email);
        console.log(contrasenya);
        
        try {
            console.log("a!")
            const database = (await clientPromise).db('appHorario');
            console.log("b!")
            const collection = database.collection('users');
            console.log("c!")
            /*
            const usuario = await collection.findOne({email: email.toString()}, function (err, result) {
                clientPromise.close();
                if (err) {
                    const myBlob = new Blob();
                    const myOptions = { status: 500, statusText: err.toString() };
                    throw new Response(myBlob, myOptions);
                };
                console.log(result.name);
            });
            */
            const usuario = await collection.findOne({email: email.toString()});
            /*
            const usuario = await collection.find({}).toArray();
            */
            mongoClient.close();  // Close connection to avoid timeout

            console.log("d!");
            console.log(usuario);
            
            if (usuario && usuario['password'] == contrasenya.toString()) {
                console.log("Usuario autentificado correctamente");
                const myBlob = new Blob(JSON.stringify({ executed: true, user: usuario}),
                                {type: "application/json",});
                const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
                return new Response(myBlob, myOptions);
            }
            
            console.log("Usuario no autentificado correctamente");
            const myBlob = new Blob(JSON.stringify({ executed: true, user: usuario}),
                                                    {type: "application/json",});
            const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
            return new Response(myBlob, myOptions);

        } catch (error) {
            mongoClient.close();  // Close connection to avoid timeout

            console.log("Error en consulta");
            const myBlob = new Blob(JSON.stringify({ executed: false}),
                                {type: "application/json",});
            const myOptions = { status: 500, statusText: error.toString() };
            return new Response(myBlob, myOptions);
        }
    };
    
