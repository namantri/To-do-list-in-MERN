import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      status: true,
      message: "Task Added successfully ",
    });
  } catch (error) {
    next(error);
  }
};
export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    //   if (!task)
    //     return res.status(404).json({
    //       success: false,
    //       message: "Task does not exist",
    //     });
    // next will automatically throw an error as there is no next function so we are defining the error of next
    // by using app.use function
    //   if (!task) return next(new Error("Task does not exist"));
    if (!task) return next(new errorHandler("Task does not exist", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new errorHandler("Task does not exist", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
