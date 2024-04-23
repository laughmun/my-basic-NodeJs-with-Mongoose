import { Router } from "express";
import { createTodo, deleteTodoById, findManyTodoList, findTodoById, findTodoList, updateTodoById } from "./todo.service";

export const router = Router();

router.post('/todos', async (req,res) => {
    try {
        const newTodo = await createTodo(req.body);
        res.send(newTodo);
      
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/todos/:id', async (req,res) => {
  try {
    const updated = await updateTodoById(
        req.params.id,
        req.body
    );
    
    console.log('updated' ,updated);
    res.send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/todos/:id', async (req,res) => {
  try {
    await deleteTodoById(req.params.id);
    res.send({
      id: req.params.id,
      isDeleted: true
    })
  } catch (error) {
    res.status(500).send(error);
  }
});
/* get ทั้งหมด
router.get('/todos', async (req,res) => {
  try {
    const findList = await findTodoList();
    res.send(findList);
  } catch (error) {
    res.status(500).send(error);
  }
});
*/
router.get('/todos/:id', async (req,res) => {
  try {
    const findListId = await findTodoById(req.params.id);
    if (findListId == null){
      res.status(404).send({
        message: `Todo not found => ${req.params.id}`
      });
      return;
    } else {
      res.send(findListId);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/todos', async (req,res) => {
  try {
    const findManyId = await findManyTodoList(req.query);
    res.send(findManyId);
  } catch (error) {
    res.status(500).send(error);
  }
});
