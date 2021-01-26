import { Task } from "../models/index.js";

//Get All Task By List ID
const getTasks = async (req, res) => {
  console.log(req.params);
  const tasks = await Task.find({});
  if (!tasks) return res.status(401).send("No any available task");
  try {
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get Task By List Id
const getTasksByListId = async (req, res) => {
  const tasks = await Task.find({ _listId: req.params.listId });
  if (!tasks) return res.status(401).send("No any available task");
  try {
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get Specific Task
const specificTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.listId);
    if (!task) return res.status(401).send("Task Not Found");
    //return list document with id
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Submit New Task
const newTask = async (req, res) => {
  const title = req.body.title;
  const newTask = new Task({
    title,
    _listId: req.params.listId,
  });

  try {
    const savetask = await newTask.save();
    //return list document with id
    res.status(200).send(savetask);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Delete Specific Task
const deleteTask = async (req, res) => {
  const _id = req.params.taskId;
  try {
    const taskRemove = await Task.findByIdAndRemove(_id);
    if (!taskRemove) return res.status(401).send("Task Not Found");
    res.status(200).send(taskRemove);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Update a Task
const updateTask = async (req, res) => {
  const task = req.body;
  const _id = req.params.taskId;
  try {
    const updateTask = await Task.findByIdAndUpdate(
      _id,
      { ...task, _id },
      { new: true }
    );
    if (!updateTask) {
      return res.status(401).send("Your task not exist");
    }
    //return updated list document with id
    res.status(200).send(updateTask);
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  getTasks,
  getTasksByListId,
  newTask,
  specificTask,
  deleteTask,
  updateTask,
};
