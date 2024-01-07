import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class TicketModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
TicketModel.setTableName("tickets");