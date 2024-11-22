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
                score: { type: Number, required: true },
                message: { type: String, required: true }
            }
        ],
        default: null
    }
});

const News = mongoose.model("News", newsSchema);

export default News;