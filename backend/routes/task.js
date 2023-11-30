const express=require("express");
const router=express.Router();

router.post("/",require("./../controllers/task").CreateTask);
router.get("/",require("./../controllers/task").GetAllTasks);
router.patch("/:id",require("./../controllers/task").UpdateTask);
router.patch("/complete/:id",require("./../controllers/task").CompleteTask);
router.delete("/:id",require("./../controllers/task").DeleteTask);
router.delete("/",require("./../controllers/task").DeleteAllTasks);



module.exports=router;