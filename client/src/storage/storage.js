import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase.js";
const storage = getStorage(app);
async function uploadAudio(audioFile, cb) {
  if (!audioFile) {
    alert("Please select an audio file.");
    return;
  }

  const storageRef = ref(
    storage,
    "audio/" + Date.now().toString() + audioFile.name
  );
  const uploadTask = uploadBytesResumable(storageRef, audioFile);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error("Upload error:", error);
    },
    () => {
      console.log("Upload successful!");
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        cb(downloadURL);
      });
    }
  );
}
export default uploadAudio;
