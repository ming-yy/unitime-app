
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:rsF2ABlIIwjSGuyZ@atlascluster.dfp8tyo.mongodb.net/?retryWrites=true&w=majority"

const mongoClient = new MongoClient(url);
const clientPromise = mongoClient.connect();


export default async (req, context) => {
   console.log(req);
   console.log(req.body);

   const contenido = req.json();
   console.log(contenido['email']);
   
   email = contenido['email'];
   contrasenya = contenido['password'];

   try {
      const database = (await clientPromise).db('appHorario');
      const collection = database.collection('users');

      const usuario = collection.find_one({"email": email.toString()});
      if (usuario && usuario['password'] == contrasenya.toString()) {
         return true;
      }
      return false;

   } catch (error) {
      return { statusCode: 500, body: error.toString() }
   }
};
  
