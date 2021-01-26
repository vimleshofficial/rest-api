import express from "express";
import {
  getList,
  newList,
  specificList,
  deleteList,
  updateList,
} from "../controller/list.js";
const router = express.Router();

//Get All List
router.get("/", getList);
//Submit New List
router.post("/", newList);
//Specific List
router.get("/:listId", specificList);
//Delete Specific List
router.delete("/:listId", deleteList);
//Update A List
router.patch("/:listId", updateList);

export default router;
