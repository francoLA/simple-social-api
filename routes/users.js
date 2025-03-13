import { Router } from "express";
import multer, { diskStorage } from "multer";
import auth from "../middlewares/auth.js";

import { createUser, login, getUser, getUsers } from "../controllers/users.js";

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
router.get("/get-user/:id", auth, getUser);
router.get("/get-users", getUsers);

//POST
router.post("/register", createUser)
router.post("/login", login)

//DELETE

//PUT

export default router;