import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";

export class TestModel extends AbstractModel{
  constructor (){
    super();
  }
}
TestModel.setTableName("test");