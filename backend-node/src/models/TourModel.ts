import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class TourModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
TourModel.setTableName("tours");