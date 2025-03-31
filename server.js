const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://mongo:27017";
const dbName = "todoDB";
const collectionName = "todos";

const app = express();
app.use(bodyParser.json());

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");
  return client;
}

app.get("/todos", async (req, res) => {
  const client = await connectDB();
  const todos = await client.db(dbName).collection(collectionName).find().toArray();
  client.close();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const client = await connectDB();
  const result = await client.db(dbName).collection(collectionName).insertOne(req.body);
  client.close();
  res.json({ message: "Todo added", id: result.insertedId });
});

app.delete("/todos/:id", async (req, res) => {
  const client = await connectDB();
  const result = await client.db(dbName).collection(collectionName).deleteOne({ _id: new MongoClient.ObjectId(req.params.id) });
  client.close();
  res.json({ message: "Todo deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));