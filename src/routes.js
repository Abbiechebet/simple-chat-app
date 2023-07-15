import {Router} from "express"
import ChatController from "../src/controller.js"

const router = Router()

router.post("/message", ChatController.createChat)
router.get("/messages", ChatController.getChat)

export {router}