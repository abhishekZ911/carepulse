import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID,
    API_KEY,
    DB_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENTS_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env


const client = new sdk.Client()

console.log(PROJECT_ID, API_KEY, ENDPOINT)
client.setEndpoint(ENDPOINT!)
.setProject(PROJECT_ID!)
.setKey(API_KEY !);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const functions = new sdk.Functions(client);
export const users = new sdk.Users(client);