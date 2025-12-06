import mongoose from "mongoose";

// define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// extend the global object to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// initialize the cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// establis a connection to MongoDB using mongoose
async function connectDB(): Promise<typeof mongoose> {
  // return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // return existing connection promise if one is in progress
  if (!cached.promise) {
    // validate MongoDB URI exists
    if (!MONGODB_URI) {
      throw new Error("Please define MONGODB_URI env variable");
    }
    const options = {
      bufferCommands: false,
    };
    // create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => mongoose);
  }

  try {
    // wait for the connection to establish
    cached.conn = await cached.promise;
  } catch (error) {
    // reset promise on error to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
