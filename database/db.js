import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb://root:root@ac-srpxarn-shard-00-00.oklol3n.mongodb.net:27017,ac-srpxarn-shard-00-01.oklol3n.mongodb.net:27017,ac-srpxarn-shard-00-02.oklol3n.mongodb.net:27017/?ssl=true&replicaSet=atlas-2z2np8-shard-0&authSource=admin&appName=Cluster0/note",
    )
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
