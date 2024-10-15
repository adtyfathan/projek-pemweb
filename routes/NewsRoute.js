import express from 'express';
import { getNews, createNews } from '../controllers/NewsController.js';

const router = express.Router();

router.get("/api/news", getNews);
router.post("/api/news", createNews);

export default router;