const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Nayan:Ypm1y91JNliJAp53@cluster0.xwwmfqh.mongodb.net/?retryWrites=true&w=majority";
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
