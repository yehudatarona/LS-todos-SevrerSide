const express = require('express');
const router = express.Router();
const { todosModel, validTask, validTodo } = require("../models/todos_model")

// testing connection to db for fun
todosModel.find({})
  .then(data => {
    console.log("then", data);
  })
  .catch(err => {
    console.log(err);
  })

//* get all todo list */
router.get('/', (req, res, next) => {
  todosModel.find({})
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});


/* get single todo list by todo id */
router.get('/single/:id/', (req, res, next) => {
  todosModel.findOne({ _id: req.params.id })
    .then(data => {
      res.json(data)

    })
    .catch(err => {
      res.status(400).json(err)
    })
});

// search query domain/todo/search/?s=<searched item>
router.get("/search/", (req, res) => {
  const mySearch = new RegExp(`${req.query.s}`);
  todosModel.find({ todo_name: mySearch })
    .then(data => {
      res.json(data)
    })
})


/* create a new todo list */
router.post("/createTodo/", async (req, res) => {
  let dataBody = req.body.todo_name;
  let todo = await (dataBody);
  if (todo.error) {
    res.status(400).json(todo.error.details[0])
  }
  else {
    try {
      let updateData = await todosModel.insertMany({"todo_name":todo});
      res.json(updateData)

    }
    catch (err) {
      console.log(err);
      res.status(400).json({ message: "error insert new todo, already in data" })
    }
  }
})

/* update todo list name */
router.post("/update/:id/", async (req, res) => {
  const dataBody = req.body;
  const todoId = req.params.id;
  let todo = await (dataBody);
  if (todo.error) {
    res.status(400).json(todo.error.details[0])
  }
  else {
    try {
      let updateData = await todosModel.updateOne( { _id: todoId }, { $set: { "todo_name": req.body.todo_name } });
      res.json(updateData);
    }
    catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message })
    }
  }
})

/* delete todo list */
router.post("/deleteTodo/:id/", (req, res) => {
  let todoId = req.params.id
  todosModel.deleteOne({ _id: todoId })
    .then(data => {
      if (data.deletedCount > 0) {
        res.json({ message: "deleted" });
      }
      else {
        res.status(400).json({ error: "error id not found" });
      }
    })
})

/* create a new item in todo list */
router.post("/:id/addItem/", async (req, res) => {
  const dataBody = req.body;
  const todoId = req.params.id;
  let todo = await (dataBody);
  if (todo.error) {
    res.status(400).json(todo.error.details[0])
  }
  else {
    try {
      let updateData = await todosModel.updateOne({ _id: todoId }, { $push: { items: dataBody } });
      res.json(updateData)

    }
    catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message })
    }
  }
})

/* update existing item in todo list */
router.post("/:id/updateItem/:itemId/", async (req, res) => {
  
  const todoId = req.params.id;
  const itemId = req.params.itemId;
  let dataBody = req.body;
  let todo = await (dataBody);
  if (todo.error) {
    res.status(400).json(todo.error.details[0])
  }
  else {
    try {
      let updateData = await todosModel.updateOne({ _id: todoId, "items._id": itemId},{ $set: {"items.$.item_name":dataBody.item_name}});
      res.json(updateData)

    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  }
})

/* update existing item status (checked/uncheck) in todo list */
router.post("/:id/updateStatus/:itemId/", async (req, res) => {
 
  const todoId = req.params.id;
  const itemId = req.params.itemId;
  let dataBody = req.body;
  let todo = await (dataBody);
  if (todo.error) {
    res.status(400).json(todo.error.details[0])
  }
  else {
    try {
      let updateData = await todosModel.updateOne({ _id: todoId, "items._id": itemId},{ $set: { "items.$.completed": dataBody.completed } });
      res.json(updateData)

    }
    catch(err) {
      res.status(400).json({ message: err.message })
    }
  }
})


/* delete item from todo list */
router.post('/:id/deleteItem/:itemId', async (req, res) => {
  let todoId = req.params.id;
  let itemId = req.params.itemId;
  try {
    await todosModel.updateOne({ _id: todoId }, { $pull: { items: { _id: itemId } } });
    res.json({ message: "deleted" });

  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


/* delete all todo list */
router.post("/clearAll", (req, res) => {
  todosModel.deleteMany({})
  .then(data => {
    if (data.deletedCount >= 0) {
      res.json({ message: "clear All List (empty collection tasks)" });
    }
    else {
      res.status(400).json({ error: "Error clear All Not Working " });
    }
  })
})


module.exports = router;
