//import { Schema, model, Query } from "mongoose";
import { Schema, model} from "mongoose";

const ChatSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  //   isDeleted: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   sendDate: Date,
  // },
  // {
  //   timestamps: true,
  // }
  });

export default model("Chat", ChatSchema);
