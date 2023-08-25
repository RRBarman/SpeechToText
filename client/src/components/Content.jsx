import { useRef, useState, useEffect } from "react";
import uploadAudio from "../storage/storage.js";
import "./Content.css";
const Base = import.meta.env.VITE_INTERNAL_SERVER;

// import assemblyai from "assemblyai";
// import { configDotenv } from "dotenv";
// configDotenv();
// assemblyai.setAPIKey(import.meta.env.VITE_APP_API_KEY);
function Content() {
  //const [scriptnew, setScriptnew] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transcript, setTranscript] = useState({});
  const inputRef = useRef();

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
    const audio_url = fileUrl;
    // http://localhost:3000/api/v1/upload
    let token = window.localStorage.getItem("Authorization");
    if (!token) {
      alert("Please login and refresh.");
    }
    fetch(Base + "/upload", {
      method: "POST",
      body: JSON.stringify({ audio_url }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTranscript(data); // raw data
        //setScriptnew(true);
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
        <button onClick={uploadAudioFile}>upload audio</button>
      )}
      {transcript.result ? (
        <>
          <h1>GENERATED TEXT</h1>
          <p style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
            {transcript.result}
          </p>
        </>
      ) : (
        <>
          <h1>GENERATED TEXT</h1>
          <p></p>
        </>
      )}
    </form>
  );
}

export default Content;
