import express from 'express';
import { getNews, createNews, getNewses, getTopNews, updateNewsComments } from '../controllers/NewsController.js';

const router = express.Router();

router.get("/api/news", getNewses);
router.get("/api/news/top-news", getTopNews);
router.get("/api/news/:id", getNews);
router.post("/api/news", createNews);
router.post("/api/news/:id/comment", updateNewsComments);

export default router;