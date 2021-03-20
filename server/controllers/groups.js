const Group = require("../models").Group;
const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  async create(req, res) {
    const group = await Group.find({
      where: {
        name: req.body.name,
      },
    });
    if (group) {
      return res.status(400).send({ message: "This group already exist" });
    }
    return Group.create({
      name:req.body.name
    })
      .then((group) => res.status(201).send(group))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
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
