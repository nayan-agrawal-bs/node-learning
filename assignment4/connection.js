import * as dotenv from "dotenv";
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://Nayan:${process.env.PASS}@cluster0.xwwmfqh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
console.log(client);
client.connect((err) => {
  console.log("herere");
  if (err) console.log(err);
  const db = client.db("test");
  db.createCollection("devices", function (err, res) {
    if (err) console.log(err);
    console.log(res);
    console.log("Collection created!");
    client.close();
  });
});
