import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb+srv://ychiel_db:yechiel123@cluster0.m6onqol.mongodb.net/?appName=Cluster0";
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
    console.error("Error initializing database:", error);
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