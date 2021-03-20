const Group = require("../models").Group;
const User = require("../models").User;
const TodoItem = require("../models").TodoItem;

module.exports = {
  async assign(req, res) {
    const item = await TodoItem.find({
      where: {
        name: req.body.name,
      },
    });
    if (group) {
      return res.status(400).send({ message: "This group already exist" });
    }
    const user = await User.find({
      where: {
        name: req.body.name,
      },
    });
    return Group.create({
      name:req.body.name
    })
      .then((group) => res.status(201).send(group))
      .catch((error) => res.status(400).send(error));
  },

  unassign(req, res) {
    return Group.findAll({
      include: [
        {
          model: Todo,
          as: "todos",
        },
      ],
      order: [
        ["createdAt", "DESC"]
      ],
    })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => res.status(400).send(error));
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
