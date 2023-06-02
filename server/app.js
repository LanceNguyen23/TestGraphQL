import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema/index.js";
import mongoose from "mongoose";
import { mongoDataMethods } from "./data/db.js";
import 'dotenv/config'

// connect to MongoDB
const uri = process.env.URI
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async () => mongoDataMethods,
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
