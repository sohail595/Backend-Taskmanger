import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// @ts-ignore
const globalWithMongoose = global as typeof globalThis & { mongoose?: MongooseCache };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (globalWithMongoose.mongoose!.conn) {
    return globalWithMongoose.mongoose!.conn;
  }

  if (!globalWithMongoose.mongoose!.promise) {
    globalWithMongoose.mongoose!.promise = mongoose
      .connect(process.env.MONGO_URI!)
      .then((mongoose) => mongoose);
  }

  globalWithMongoose.mongoose!.conn = await globalWithMongoose.mongoose!.promise;
  console.log("MongoDB connected");

  return globalWithMongoose.mongoose!.conn;
};

export default connectDB;