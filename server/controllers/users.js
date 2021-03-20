const User = require("../models").User;
const UserItem = require("../models").UserItem;
const Comment = require("../models").Comment;

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
          model: UserItem,
          as: "userItems",
        },
      ],
      order: [["createdAt", "DESC"]],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return User.findById(req.params.id, {
      include: [
        {
          model: UserItem,
          as: "userItems",
        },
        {
          model: Comment,
          as: "userComments",
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },
};
