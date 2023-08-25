import ProcessedText from '../models/processedText.js'; // Update the path to your model

export async function getTask(req, res) {
    const { id } = req.params;
    const task = await ProcessedText.findById(id).exec();
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user_id != req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(task);
    res.status(200).json({
        message: `Task ${id}`
    });
}

export async function getAllTasks(req, res) {
    try {
        const userId = req.user.id;
        const tasks = await ProcessedText.find({ user_id: userId }).exec();
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.sjson({
            error: error
        });
    }
}