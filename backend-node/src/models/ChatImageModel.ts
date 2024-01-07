import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class ChatImageModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
ChatImageModel.setTableName("chat_images");