import { Router } from "express";
import multer, { diskStorage } from "multer";
import auth from "../middlewares/auth.js";

import { test, getArticles, createArticle, getArticle, deleteArticle, updateArticle, uploadFile, search } from "../controllers/articles.js";

const router = Router();
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/articles/');
    },

    filename: (req, file, cb) => {
        cb(null, "article" + Date.now() + file.originalname);
    }
});

const uploads = multer({storage});

// router.get("/test-route", test);

//GET
router.get("/get-articles",auth, getArticles);
router.get("/get-article/:id",auth, getArticle);
router.get("/search-articles/:keyWords", search);

//POST
router.post("/create-article",auth, createArticle);
router.post("/upload-image/:id", [uploads.single("file")], uploadFile);

//DELETE
router.delete("/delete-article/:id",auth, deleteArticle);

//PUT
router.put("/update-article/:id",auth, updateArticle);

export default router;