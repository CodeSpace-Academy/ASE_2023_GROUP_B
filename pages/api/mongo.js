import { MongoClient } from "mongodb";

async function handler(req, res) {

  const connectionString = `mongodb+srv://groupb:siGyDb5l6UAMEEgD@groupb.xmhz5up.mongodb.net/?retryWrites=true&w=majority`;

  let client 
  try {
    client = await MongoClient.connect(connectionString)

  }

    catch (error) {
      return res.status(500).json({ message: "Failed to connect!" });
    }

    if (req.method === 'GET') {
      try {
        const db = client.db('devdb');

        const documents = await db
          .collection('recipes')
          .find()
          .skip(20)
          .limit(20)
          .sort()
          .toArray();
      
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: 'Getting comments failed.' });
      }
    }

  }

export default handler;