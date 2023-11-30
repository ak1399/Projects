const taskModel = require("./../models/task");

exports.CreateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }
        const data = await new taskModel(req.body).save();
        res.status(201).json({ message: "Task created successfully", data });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((error) => error.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.GetAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.UpdateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const taskId = req.params.id;
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }
        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.status(200).json({ message: "Task updated successfully", data: updatedTask });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((error) => error.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.CompleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const existingTask = await taskModel.findById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: "Task not found." });
        }
        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            { status: "Completed" },
            { new: true } 
        );
        res.status(200).json({ message: "Task status set to Completed", data: updatedTask });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.DeleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const existingTask = await taskModel.findById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: "Task not found." });
        }
        await taskModel.findByIdAndDelete(taskId);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};




exports.DeleteAllTasks = async (req, res) => {
    try {
        await taskModel.deleteMany({});
        res.status(200).json({ message: "All tasks deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

