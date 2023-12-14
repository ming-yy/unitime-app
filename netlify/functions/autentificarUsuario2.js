
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();


export default async (req, context) => {
   console.log("DENTRO!")
   //console.log(req);
   //console.log(req.body);

   const contenido = await req.json();
   console.log(contenido)
   //console.log(contenido['email']);
   
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
      const usuario = await collection.find_one({email: email.toString()}, function (err, result) {
         if (err) throw err;
         console.log(result.name);
         database.close();
      });
      */
      const usuario = await collection.find({}).toArray();
      console.log("d!");
      console.log(usuario);

      database.close();      // Close connection to database to close function
      
      if (usuario && usuario['password'] == contrasenya.toString()) {
         return new Response("Ok");
      }
      
      const myBlob = new Blob();
      const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
      const myResponse = new Response(myBlob, myOptions);
      return myResponse;

   } catch (error) {
      return { statusCode: 500, body: error.toString() }
   }
};
  
