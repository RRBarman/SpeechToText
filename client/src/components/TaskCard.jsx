import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function TaskCard({ task }) {
  const Navigate = useNavigate();
  function handleclick(id) {
    Navigate("/userTasks/" + id);
    //console.log();
  }
  return (
    <div className="task-card-container" onClick={() => handleclick(task._id)}>
      {task.result}
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    // Add more prop validations as needed
  }).isRequired,
};

export default TaskCard;
