const Group = require("../models").Group;
const User = require("../models").User;
const UserItem = require("../models").UserItem;
const TodoItem = require("../models").TodoItem;

module.exports = {
  async assign(req, res) {
    const item = await TodoItem.findByPk(req.params.itemId);
    if (!item) {
      return res.status(404).send({ message: "This item doesn't exist" });
    }
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .send({ message: "This user doesn't  already exist" });
    }
    const userItem = await UserItem.find({
      where: {
        userId: user.id,
        todoItemId: req.params.itemId,
      },
    });
    if (userItem) {
      userItem.update({
        assigned: true,
      });
      return res.status(201).send(userItem);
    } else {
      return UserItem.create({
        userId: user.id,
        todoItemId: item.id,
        assigned: true,
      })
        .then((userItem) => res.status(201).send(userItem))
        .catch((error) => res.status(400).send(error));
    }
  },

  async unassign(req, res) {
    const userItem = await UserItem.find({
      where: {
        userId: req.params.userId,
        todoItemId: req.params.itemId,
      },
    });
    if (!userItem) {
      return res
        .status(404)
        .send({ message: "You haven't assigned this task to the user yet" });
    }

    userItem.update({
      assigned: false,
    });
    return res.status(201).send(userItem);
  },

  retrieve(req, res) {
    return Group.findById(req.params.group, {
      include: [
        {
          model: Todos,
          as: "todos",
        },
      ],
    })
      .then((group) => {
        if (!group) {
          return res.status(404).send({
            message: "Group Not Found",
          });
        }
        return res.status(200).send(group);
      })
      .catch((error) => res.status(400).send(error));
  },
};
