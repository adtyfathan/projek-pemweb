import express from 'express';
import { getNews, insertNews, updateNews, deleteNews, createNews, getNewses, getTopNews, updateNewsComments, handleLike } from '../controllers/NewsController.js';

const router = express.Router();

router.get("/api/news", getNewses);
router.get("/api/news/top-news", getTopNews);
router.get("/api/news/:id", getNews);
router.post("/api/news", createNews);
router.post("/api/news/:id/comment", updateNewsComments);
router.post("/api/news/handle-like", handleLike);
router.delete("/api/news/delete-news/:id", deleteNews);
router.put("/api/news/update-news", updateNews);
router.post("/api/news/insert-news", insertNews);

export default router;