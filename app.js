import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { router as chatRouter } from "./src/routes.js";
import http from 'http';
import { Server } from 'socket.io';

const port = Number(process.env.PORT) || 4000;

const app = express();
const server = http.createServer(app);
const socketServer = new Server(server);

dotenv.config()

app.use(morgan("tiny"));
app.use(express.json());

socketServer.on('connection', () => {
  console.log('A user connected');
});

// Database connection
mongoose
//config.mongodb_connection_url
  .connect(process.env.MONGODB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connection established"))
  .catch((e) => console.log("Mongo connection error: ", e.message));

// Middlewares
app.use("/api/v1/chat", chatRouter);
app.use((err, req, res)=>{
  return res.status(err.status || 404).json({
    message: err.message,
    status: "Failed",
  })
})

app.listen(port, () => console.log(`server listening on port: ${port}`));