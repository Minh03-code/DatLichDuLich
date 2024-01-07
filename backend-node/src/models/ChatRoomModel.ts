import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class ChatRoomModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
ChatRoomModel.setTableName("chat_rooms");