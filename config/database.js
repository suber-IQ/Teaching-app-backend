import mongoose from "mongoose";

const connectedDatabase = async (DATABASE_URL) => {
  try {
    await mongoose.connect(`${DATABASE_URL}`);
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
};
mongoose.connection.on("disconnect",connectedDatabase);



export default connectedDatabase;
