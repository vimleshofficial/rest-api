import { List } from "../models/index.js";

//Get All List
const getList = async (req, res) => {
  const lists = await List.find({});
  if (!lists) return res.status(401).send("No any available list");
  try {
    res.status(200).send(lists);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get Specific List
const specificList = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(401).send("List Not Found");
    //return list document with id
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Submit New List
const newList = async (req, res) => {
  const title = req.body.title;
  const list = new List({
    title,
  });

  try {
    const saveList = await list.save();
    //return list document with id
    res.status(200).send(saveList);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Delete Specific List
const deleteList = async (req, res) => {
  const _id = req.params.listId;
  try {
    const listRemove = await List.findByIdAndRemove(_id);
    if (!listRemove) return res.status(401).send("List Not Found");
    res.status(200).send(listRemove);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Update a List
const updateList = async (req, res) => {
  const list = req.body;
  const _id = req.params.listId;
  try {
    const updateList = await List.findByIdAndUpdate(
      _id,
      { ...list, _id },
      { new: true }
    );
    if (!updateList) {
      return res.status(401).send("Your list not exist");
    }
    //return updated list document with id
    res.status(200).send(updateList);
  } catch (err) {
    res.status(400).send(err);
  }
};

export { getList, newList, specificList, deleteList, updateList };
