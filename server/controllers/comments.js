const Comment = require("../models").Comment;
const User = require("../models").User;
const TodoItem = require("../models").TodoItem;

module.exports = {
  async create(req, res) {
    if (!req.body.comment) {
      return res.status(404).send({ message: "Please pass in a comment" });
    }
    const item = await TodoItem.findByPk(req.params.itemId);
    if (!item) {
      return res.status(404).send({ message: "This item doesn't exist" });
    }
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .send({ message: "This user doesn't exist" });
    }
    Comment.create({
      userId: user.id,
      todoItemId: item.id,
      comment: req.body.comment,
    })
      .then((userItem) => res.status(201).send(userItem))
      .catch((error) => res.status(400).send(error));
  },

 
};
