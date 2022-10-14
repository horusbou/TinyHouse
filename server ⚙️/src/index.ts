require('dotenv').config()
import express, { Application } from "express"
import { ApolloServer } from "apollo-server-express"
import { typeDefs, resolvers } from './graphql'
import { connectDatabase } from './database'


const main = async (app: Application, port = process.env.PORT) => {

  const db = await connectDatabase()
  const server = new ApolloServer({ typeDefs, resolvers, context: () => ({db}) }) //typedef: `` resolvers: {Query:{getUser()}}

  await server.start();
  server.applyMiddleware({ app, path: '/api' })

  //middleware
  app.use(express.json())


  app.listen(port, () => console.log('server is running'))
}

main(express())


