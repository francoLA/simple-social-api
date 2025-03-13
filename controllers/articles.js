import validateArticle from "../helpers/validators/articles.js";
import Article from "../models/Articles.js";
import { followInfo } from "../services/followService.js";

export const test = (req, res) => {
    return res.status(200).json({
        message: "test"
    });
}

export const createArticle = (req, res) => {
    const params = req.body;
    const user = req.user;

    // validate
    try {
        validateArticle(params);
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Title or content must not be empty"
        });
    }

    const article = new Article({
        user: user.id,
        title: params.title,
        content: params.content,
    });

    article.save().then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Article created succesfully",
            article: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error while saving new article"
        });
    })   
}

export const getArticles = async (req, res) => {
    const follow = await followInfo(req.user);
    console.log(follow);
    
    Article.find({user: req.user.id}).then((result) => {
        if(!result){
            return res.status(400).json({
                status: "Error",
                message: "No articles found"
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Articles found",
            articles: result,
            user: req.user,
            followData: follow
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "No articles found"
        });
    })
}

export const getArticle = (req, res) => {
    let idArticle = req.params.id;

    Article.findById(idArticle).then((result) => {
        if(!result){
            return res.status(400).json({
                status: "Error",
                message: "No article found"
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Article found",
            article: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "No article found"
        });
    })
}

export const deleteArticle = (req, res) => {
    let idArticle = req.params.id;

    Article.findOneAndDelete({_id: idArticle}).then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Article deleted",
            articleDeleted: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error when attempting to delete article"
        });
    })
}

export const updateArticle = (req, res) => {
    let idArticle = req.params.id;
    let content = req.body;

    // validate
    try {
        validateArticle(content);
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Title or content must not be empty"
        });
    }

    Article.findOneAndUpdate({_id: idArticle}, content, {new: true}).then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Article updated",
            articleUpdated: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error when attempting to update an article"
        });
    })
}

export const uploadFile = (req, res) => {
    if (!req.file && !req.files) {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error when attempting to upload file"
        });
    }

    let idArticle = req.params.id;
    Article.findOneAndUpdate({_id: idArticle}, {image: req.file.filename}, {new: true}).then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Article updated",
            articleUpdated: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error when attempting to update image from atricle"
        });
    })
}

export const search = (req, res) => {
    let keyWords = req.params.keyWords;

    Article.find({
        "$or": [
            {"title": {"$regex": keyWords, "$options": "i"}},
            {"content": {"$regex": keyWords, "$options": "i"}}
        ]
    })
    .sort({date: -1})
    .then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Articles found",
            articles: result
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Articles have not be found"
        });
    })
}