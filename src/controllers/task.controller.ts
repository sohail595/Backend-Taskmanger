import { Request, Response } from "express";
import Task from "../models/task.model";
import cloudinary from "../config/Cloudinary";


//  create api

export const createTask = async (req: Request, res: Response) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    const { title, description, date, priority, status } = req.body;

    if (!title || !date || !priority) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //  const imageUrl = req.file ? req.file.path : "";
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      // req.file.path is already the Cloudinary URL
      imageUrl = req.file.path;

      // req.file.filename is the public_id (with folder)
      imagePublicId = req.file.filename;
    }

    const task = await Task.create({
      title,
      description,
      date,
      priority,
      status,
      image: imageUrl,
       imagePublicId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to respond data" });
  }
};

    //  get Api
export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
};

    // get one
export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

    //  edit or update
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.date = req.body.date || task.date;
    task.priority = req.body.priority || task.priority;
    task.status = req.body.status || task.status;

    // Replace image if new file uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (task.imagePublicId) {
        await cloudinary.uploader.destroy(task.imagePublicId);
      }

      // Save new image info
      task.image = req.file.path;
      task.imagePublicId = req.file.filename;
    }

    await task.save();

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};


// delete 

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🗑 Delete image file if exists
    // if (task.image) {
    //   const imagePath = path.join(process.cwd(), task.image);

    //   if (fs.existsSync(imagePath)) {
    //     fs.unlinkSync(imagePath);
    //   }
    // }

    if (task.imagePublicId) {
  await cloudinary.uploader.destroy(task.imagePublicId);
}

    // 🗑 Delete task from DB
    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  };
};

    // update the status to complete

 export const updateTaskStatus = async (req:Request, res:Response) => {
       try {

        const {id} = req.params;
        const {status} = req.body; 

        if(!status) return res.status(404).json ({message : "Status is Required"});

        const task = await Task.findById(id);
        if(!task)  return res.status(404).json ({message : "Task not found"});

        task.status =status;
        await task.save();

        res.json({message : "Status Updated Successfully", task});
         



       } catch (error) {
           console.error("UPDATE STATUS ERROR:", error);
           res.status(500).json({message : "Failed to Update Status"})
       }  
 };



//  get all status who is completed

export const getcompletedTask = async (_req:Request, res:Response) => {
  try {
       const completedTasks = await Task.find({status :"Completed"});
        res.json(completedTasks);
  } catch (error) {
    console.error("Get Completed Tasks Error", error);
    res.status(500).json({message : "Failed to fetch completed tasks"})
  }
};