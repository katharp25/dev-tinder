const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://pradipkathar25:rqZFpijOA0rNQQ6w@devtinder.lfz2ei7.mongodb.net/?retryWrites=true&w=majority&appName=devtinder";
const client = new MongoClient(url);

const dbName = "HelloWord";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // the following code examples can be pasted here...

  const data = {
    firstName: "Nana",
    lastName: "Patekar",
    city: "Mumbai",
    mobileNumbe: "9898989776",
  };

  const insertResult = await collection.insertMany([
    data
  ]);
  console.log("Inserted documents =>", insertResult);

  const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
console.log('Updated documents =>', updateResult);

  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
