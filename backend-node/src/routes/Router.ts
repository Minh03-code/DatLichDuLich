import express from 'express';
import { getAllTestAPI } from "../controllers/TestController";

const router = express.Router();

router.get('/test', getAllTestAPI);

export default router;