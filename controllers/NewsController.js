import News from "../models/NewsModel.js";

export const getNewses = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);

        if (!news) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });
        res.status(200).json(news);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

export const getTopNews = async (req, res) => {
    try {
        const topNews = await News.find().sort({ like: -1 }).limit(4);
        res.status(200).json(topNews)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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

export const updateNewsComments = async (req, res) => {
    const newsId = req.params.id;
    const { name, image, score, message } = req.body;

    try {
        const result = await News.updateOne(
            { _id: newsId },
            {
                $push: {
                    comment: {
                        name,
                        image,
                        score,
                        message,
                        createdAt: new Date()
                    }
                }
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const handleLike = async (req, res) => {
    const { id, count } = req.body;
    try {
        const result = await News.findOneAndUpdate(
            { _id: id },
            { $inc: { like: count } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateNews = async (req, res) => {
    const { newsId, title, description, date, image } = req.body;
    try {
        const news = await News.updateOne(
            { _id: newsId },
            {
                $set: { title, description, date, image }
            }
        );
        res.status(200).json({ message: "news data changed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const insertNews = async (req, res) => {
    const {
        title,
        description,
        date,
        image,
    } = req.body;

    try {
        const newNews = new News({
            title,
            description,
            date,
            image,
        });

        await newNews.save();

        res.status(201).json({ message: "News added successfully", news: newNews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
