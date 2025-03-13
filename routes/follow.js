import { Router } from "express";
import multer, { diskStorage } from "multer";
import auth from "../middlewares/auth.js";

import { save, unfollow, following, feed } from "../controllers/follow.js";

const router = Router();
// const storage = diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images/articles/');
//     },

//     filename: (req, file, cb) => {
//         cb(null, "article" + Date.now() + file.originalname);
//     }
// });

// const uploads = multer({storage});

// router.get("/test-route", test);

//GET
router.get("/following/:page?",auth, following);
router.get("/feed/:page?",auth, feed);

//POST
router.post("/start-following",auth, save);

//DELETE
router.delete("/unfollow",auth, unfollow)

//PUT

export default router;