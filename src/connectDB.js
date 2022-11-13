import mongoose from "mongoose";

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (e) {
    console.log(e);
  }
};
export default connectDatabase;
