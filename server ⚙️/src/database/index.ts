import { MongoClient } from "mongodb"
import { Database, User,Listing,Booking } from '../lib/types'

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/test`

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url)
  const db = client.db('main')

  return {
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
    bookings: db.collection<Booking>("bookings")
  }
}
