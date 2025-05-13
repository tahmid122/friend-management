const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mdtahmidalam122:ww5wisp0xj275JBQ@cluster0.jxsg4pv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//middleware
app.use(cors());
app.use(express.json());

// mdtahmidalam122
// ww5wisp0xj275JBQ;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("usersDB").collection("users");
    // get data from db- R
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // post data to db- C
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.send(user);
    });
    //delete data from db collection- D
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = new ObjectId(id);
      const result = await usersCollection.deleteOne({ _id: query });
      res.send(result);
    });
    //update data to db collection- U
    app.put("/users/:id", async (req, res) => {
      const user = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const Updatedoc = { $set: { name: user.name, email: user.email } };
      const result = await usersCollection.updateOne(filter, Updatedoc);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
//endpoints
app.get("/", (req, res) => {
  res.send("Friend management server is running");
});
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
