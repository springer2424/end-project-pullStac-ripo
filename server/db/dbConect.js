import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.MONGO_DB_URI;
const DB_NAME = "egentsDb";
const COLLECTION_NAME = "usersData"

let mongocClient = null;
let mongoConn = null;

export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(MONGO_URL);
    await mongocClient.connect();
    mongoConn = mongocClient.db(DB_NAME);
    
    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing database:", error.message);
    throw error;
  }
}

export async function getMongoDbConn() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(MONGO_URL);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}