import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "./ContextProvider";
const SingleUserTask = () => {
  const { id } = useParams();
  const { user } = useContext(authContext);
  //console.log(id);
  const [singleTask, setsingleTask] = useState(null);
  useEffect(() => {
    getSingleTask();
  }, []);
  async function getSingleTask() {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "tasks/getTask/" + id,
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
      setsingleTask(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="card">
        {singleTask && (
          <>
            <audio controls src={singleTask.description.audio_url}></audio>
            <div className="card-inner-text">
              <p>{singleTask.result}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleUserTask;
