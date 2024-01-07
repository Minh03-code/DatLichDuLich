import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class TourCommentModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
TourCommentModel.setTableName("tour_comments");