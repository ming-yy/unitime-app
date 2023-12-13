
export default async (req, context) => {
    //const requestKey = req.headers.get("X-API-Key");
    console.log(req);
    console.log(req.body);
    console.log(req.body['email']);
    const requestKey = req.body.get("email");
    console.log(requestKey)
    //const apiKey = Netlify.env.get("MY_API_KEY");

    return new Response("Welcome!");
  };
  