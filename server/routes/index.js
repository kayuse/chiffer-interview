const todosController = require("../controllers").todos;
const todoItemsController = require("../controllers").todoItems;
const usersController = require("../controllers").users;
const groupsController = require("../controllers").groups;
const userItemsController = require("../controllers").useritems;
const commentsController = require("../controllers").comments;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!",
    })
  );

  app.post("/api/todos", todosController.create);
  app.get("/api/todos", todosController.list);
  app.post("/api/todos/add-group/:todoId/:groupId", todosController.addGroup);
  app.get("/api/todos/:todoId", todosController.retrieve);
  app.put("/api/todos/:todoId", todosController.update);
  app.delete("/api/todos/:todoId", todosController.destroy);

  app.post("/api/todos/:todoId/items", todoItemsController.create);
  app.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);
  app.delete(
    "/api/todos/:todoId/items/:todoItemId",
    todoItemsController.destroy
  );

  //users api
  app.post("/api/users", usersController.create);
  app.get("/api/users", usersController.list);

  //groupsapi
  app.post("/api/groups", groupsController.create);
  app.get("/api/groups", groupsController.list);

  //useritems
  app.post("/api/useritem/assign/:userId/:itemId", userItemsController.assign);
  app.post("/api/useritem/unassign/:userId/:itemId", userItemsController.unassign);
  //comments
  app.post("/api/comment/create/:userid/:itemId", commentsController.create);


  app.all("/api/todos/:todoId/items", (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed",
    })
  );
};
