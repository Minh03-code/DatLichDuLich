import express from 'express';
import TestController from "../controllers/TestController";

const router = express.Router();

router.get('/test', TestController.getAllTestAPI);
router.get('/test/id/:id', TestController.getTestByIdAPI);
router.delete('/test/delete/:id', TestController.deleteTestByIdAPI);
router.post('/test/create', TestController.createDataTestAPI);
router.put('/test/update', TestController.updateDataTestAPI);

export default router;