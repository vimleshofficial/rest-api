import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config();

//Import Routes
import postsRoute from "./routes/posts.js";
import userRoute from "./routes/user.js";
import ListRoute from "./routes/list.js";
import TaskRoute from "./routes/task.js";

//Midleware
app.use(cors());
app.use(express.json({ limit: "10MB" }));
//Roure midleware
app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/lists", ListRoute);
app.use("/tasks", TaskRoute);

//ROUTES

app.get("/", (req, res) => {
  res.status(200).send("Hello API");
});

//Connect DB
const PORT = process.env.PORT || 5000;
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("connected to db!")
);

app.listen(PORT, () => console.log(`Server Up and running on ${PORT} post`));
