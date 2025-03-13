import connection from "./database/connection.js";
import express, { json } from "express";
import cors from "cors";
import ArticlesRoutes from "./routes/articles.js";
import UsersRoutes from "./routes/users.js";
import FollowsRoutes from "./routes/follow.js";

console.log("API start!");

connection();

const app = express();
const port = 3900;

app.use(cors());

app.use(json());

app.listen(port, () => {
    console.log("Listen in port 3900");
});

app.use("/api", ArticlesRoutes);
app.use("/api", UsersRoutes);
app.use("/api", FollowsRoutes);