const SourceComment = require("../models/sourcecommentModel");
const mongoose = require("mongoose");

// get all sourcecomments
const getSourceComments = async (req, res) => {
  const sourcecomments = await SourceComment.find({}).sort({ createdAt: -1 });

  res.status(200).json(sourcecomments);
};

// filter sourcerecipes by recipegroupId
const getSourceCommentsByRecipeGroupId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sourcecomment" });
  }

  const recipegroupId = id;

  const sourcecomments = await SourceComment.find({ recipegroupId }).sort({
    createdAt: -1,
  });

  res.status(200).json(sourcecomments);
};

// get a single sourcecomment
const getSourceComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sourcecomment" });
  }

  const sourcecomment = await SourceComment.findById(id);

  if (!sourcecomment) {
    return res.status(404).json({ error: "No such sourcecomment" });
  }

  res.status(200).json(sourcecomment);
};

// create new sourcecomment
const createSourceComment = async (req, res) => {
  const { name } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const sourcecomment = await SourceComment.create({
      name,
      updatedby: user_id,
    });
    res.status(200).json(sourcecomment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a sourcecomment
const deleteSourceComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sourcecomment" });
  }

  const sourcecomment = await SourceComment.findOneAndDelete({ _id: id });

  if (!sourcecomment) {
    return res.status(400).json({ error: "No such sourcecomment" });
  }

  res.status(200).json(sourcecomment);
};

// update a sourcecomment
const updateSourceComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sourcecomment" });
  }

  const sourcecomment = await SourceComment.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!sourcecomment) {
    return res.status(400).json({ error: "No such sourcecomment" });
  }

  res.status(200).json(sourcecomment);
};

module.exports = {
  getSourceComments,
  getSourceCommentsByRecipeGroupId,
  getSourceComment,
  createSourceComment,
  deleteSourceComment,
  updateSourceComment,
};
