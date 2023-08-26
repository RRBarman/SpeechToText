import { useRef, useState, useEffect, useContext } from "react";
import uploadAudio from "../storage/storage.js";
import "./Content.css";
const Base = import.meta.env.VITE_INTERNAL_SERVER;
import { authContext } from "./ContextProvider.jsx";

function Content() {
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loader, setloader] = useState(false);
  const [transcript, setTranscript] = useState({});
  const inputRef = useRef();
  const { user } = useContext(authContext);

  const uploadAudioFile = (e) => {
    e.preventDefault();
    const audioFile = inputRef.current.files[0];
    if (audioFile) {
      setUploading(true);
      uploadAudio(audioFile, setFileUrl);
      console.log(fileUrl);
    }
  };
  useEffect(() => {
    if (fileUrl) {
      setUploading(false);
      console.log(fileUrl);
    }
  }, [fileUrl]);

  const submitform = (e) => {
    e.preventDefault();
    getTranscript();
  };

  const getTranscript = async () => {
    if (!user) {
      alert("Please Login to continue");
      return;
    }
    setloader(true);
    const audio_url = fileUrl;
    fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
      method: "POST",
      body: JSON.stringify({ audio_url }),
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTranscript(data); // raw data
        //setScriptnew(true)
        setloader(false);
      })
      .catch((error) => {
        console.log(error);
        window.localStorage.removeItem("Authorization");
        alert("Your Session has expired , please Re-Login");
      });
  };
  return (
    <form className="form-element">
      <input ref={inputRef} type="file" accept="audio/**" />
      {fileUrl ? (
        <button onClick={submitform}>submit</button>
      ) : (
        <button onClick={uploadAudioFile} disabled={uploading}>
          upload audio
        </button>
      )}
      {transcript.result ? (
        <>
          <h1>GENERATED TEXT</h1>
          <p
            className="text-generated"
            style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
          >
            {transcript.result}
          </p>
        </>
      ) : (
        <>
          <h1>GENERATED TEXT</h1>
          <p>{loader && "We are procesing your audio!"}</p>
        </>
      )}
    </form>
  );
}

export default Content;
