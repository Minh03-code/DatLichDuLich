import { Request, Response } from 'express';
import { getAllTest} from "../models/TestModel";

export const getAllTestAPI = async (req: Request, res: Response) => {
  try {
    const test = await getAllTest();
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};