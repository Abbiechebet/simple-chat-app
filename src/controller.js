import Chat from "../src/model.js"
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const socketServer = new Server(server);


export default class ChatController {
  static async createChat(req, res,next){
    try{
        const newChat = await Chat.create(req.body)
        res.status(200).json({
          message: "chat  created successfully",
          status: "Success",
          data:{
            newChat
          }
        })

      }catch(err){
        console.log(err.message)
        next(err)
      }
  }

  static async getChat(req, res,next){
     try{
        const { id } = req.query;
        const chat = await Chat.findById(id)
        if(!chat) throw new error(`The chat with this id: ${id}, does not exist`)
        socketServer.emit('chat', req.body);
        return res.status(200).json({
            message: "chat found successfully",
            status: "Success",
            data: 
             chat
          })
     }catch(err){
        console.log(err.message)
        next(err)
      }

   
  }
}
