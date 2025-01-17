import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URL;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("E-commerce database connected successfully!"))
    .catch((err) =>{

      console.log(err)
      console.log(`Getting Error from DB connection ${err.message}`)
    }
    );
};

export default connectToDB;