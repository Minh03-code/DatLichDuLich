import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class TourRatingModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
TourRatingModel.setTableName("tour_ratings");