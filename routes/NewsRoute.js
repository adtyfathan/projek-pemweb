import express from 'express';
import { getNews, createNews, getNewses } from '../controllers/NewsController.js';

const router = express.Router();

router.get("/api/news", getNewses);
router.get("/api/news/:id", getNews);
router.post("/api/news", createNews);

export default router;