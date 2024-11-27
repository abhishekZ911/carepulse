import { UserSquare2 } from "lucide-react"
import { users } from "../appwrite.config"
import { ID, Query } from "node-appwrite"
import { parseStringify } from "../utils";
require('dotenv').config();

import * as sdk from 'node-appwrite';

// export const {
//     PROJECT_ID,
//     API_KEY,
//     DB_ID,
//     PATIENT_COLLECTION_ID,
//     DOCTOR_COLLECTION_ID,
//     APPOINTMENTS_COLLECTION_ID,
//     NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT: ENDPOINT
// } = process.env

const PROJECT_ID = process.env.PROJECT_ID || '674350c3000d37353258'
const API_KEY = process.env.API_KEY || 'standard_7c76a7e5dfb8c45c29b0be8044070711c988ba557f6760db6ac649ac94dda2a7d69648435be0bd823dd0791c915f3a5a558d0801274c2c6b1fb1aadc7b36bb16d892325f8e8b6dc5373298cf1b395939cf9c0f4c64d6d8f5645c3c8fbd3edc39332e87ca1760a294a29eba520a987a5127528a9a06d6f01e21985403920bfab0'
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT   




export const createUser = async (user: CreateUserParams) => {

    const client = new sdk.Client()

    console.log(process.env.PROJECT_ID)
    client.setEndpoint('https://cloud.appwrite.io/v1'!)
        .setProject(PROJECT_ID!)
        .setKey(API_KEY!);

    const users = new sdk.Users(client);

    console.log(user)

    try {
        const newUser = await users.create(
            ID.unique(), 'abhikeshri0888@gmail.com', '+917250711248', undefined, 'abhishek'
        );
        console.log(newUser)

        return newUser
    } catch (error: any) {
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        }
    }
}