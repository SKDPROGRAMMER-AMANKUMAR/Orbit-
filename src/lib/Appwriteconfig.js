import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT) // Appwrite Cloud Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // Replace with your Appwrite Project ID
//   .setKey(import.meta.env.VITE_APPWRITE_StorageKey_KEY); // Securely use the API Key

export const storage = new Storage(client);


