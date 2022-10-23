require('dotenv').config()
import express, { Application } from "express"
import { ApolloServer } from "apollo-server-express"
import { typeDefs, resolvers } from './graphql'
import { connectDatabase } from './database'
import cookieParser from "cookie-parser"


const main = async (app: Application, port = process.env.PORT) => {

  const db = await connectDatabase()

  //middleware
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(express.json())

  const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req, res }) => ({
      db, req, res
    })
  }) //typedef: `` resolvers: {Query:{getUser()}}

  await server.start();
  server.applyMiddleware({ app, path: '/api' })



  app.listen(port, () => console.log('server is running'))
}

main(express())


