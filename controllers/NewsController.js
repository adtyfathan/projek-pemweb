import News from "../models/NewsModel.js";

export const getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNews = async (req, res) => {
    const { title, description, date, image } = req.body;

    const newNews = new News({ title, description, date, image });

    try {
        await newNews.save();
        res.status(201).json(newNews)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}