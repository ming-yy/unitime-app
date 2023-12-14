
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

   try {
      console.log("a!")
      const database = (await clientPromise).db('appHorario');
      console.log("b!")
      const collection = database.collection('users');
      console.log("c!")

      const usuario = await collection.find_one({"email": email.toString()});
      console.log("d!")
      if (usuario && usuario['password'] == contrasenya.toString()) {
         return true;
      }
      return false;

   } catch (error) {
      return { statusCode: 500, body: error.toString() }
   }
};
  
