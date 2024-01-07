import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class ChatInfoModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
ChatInfoModel.setTableName("chat_infos");