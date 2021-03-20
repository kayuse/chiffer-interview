const User = require("../models").User;
const TodoItem = require("../models").TodoItem;

module.exports = {
  async create(req, res) {
    const user = await User.find({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).send({ message: "This user already exist" });
    }
    return User.create({
      firstName: req.body.email,
      lastName: req.body.lastName,
      email: req.body.email,
    })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return User.findAll({
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: TodoItem, as: "todoItems" }, "createdAt", "ASC"],
      ],
    })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Todo.findById(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: "Todo Not Found",
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },
};
