import { useState, useContext, useEffect } from "react";
import { authContext } from "./ContextProvider.jsx";
import TaskCard from "./TaskCard.jsx";
const AllUserTask = () => {
  const [alltask, setalltask] = useState([]);
  const { user } = useContext(authContext);
  useEffect(() => {
    getAllTasks();
  }, [user]);
  async function getAllTasks() {
    if (!user) {
      alert("Please Login before accessing tasks!");
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/tasks/gatAllTask",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );
      const result = await response.json();
      setalltask(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="card-container">
        AllUserTask
        <div className="card-contaier-inner">
          {user &&
            alltask.map((task) => {
              return <TaskCard key={task._id} task={task} />;
            })}
        </div>
      </div>
    </>
  );
};

export default AllUserTask;
