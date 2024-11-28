import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    date: { type: String, required: true },
    image: { type: String, required: true },
    like: { type: Number, required: false, default: 0 },
    comment: {
        type: [
            {
                name: { type: String, required: true },
                image: { type: String, default: "/images/profile-default.png" },
                score: { type: Number, required: true },
                message: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        default: []
    }
});

const News = mongoose.model("News", newsSchema);

export default News;