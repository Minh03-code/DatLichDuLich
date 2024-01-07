import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class SaveTicketModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
SaveTicketModel.setTableName("save_tickets");