import express from "express";
import {
  getTasks,
  getTasksByListId,
  newTask,
  specificTask,
  deleteTask,
  updateTask,
} from "../controller/task.js";
const router = express.Router();

//Get All Task
router.get("/", getTasks);
//Get All Task By List Id
router.get("/list/:listId", getTasksByListId);
//Submit New Task
router.post("/list/:listId", newTask);
//Specific Task
router.get("/:taskId", specificTask);
//Delete Specific Task
router.delete("/:taskId", deleteTask);
//Update A Task
router.patch("/:taskId", updateTask);

export default router;
