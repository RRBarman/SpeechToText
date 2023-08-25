import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "./firebase.js";
//import { getStorage ,ref} from "firebase/storage";
const storage = getStorage(app);
async function uploadAudio(audioFile,cb) {

    //const audioFileInput = document.getElementById('audioFile');
    //const audioFile = audioFileInput.files[0];
    if (!audioFile) {
        alert('Please select an audio file.');
        return;
    }
    
    // Create a reference to the Firebase Storage location
    //const storageRef = ref('audio/' + audioFile.name);
    const storageRef = ref(storage,'audio/' + Date.now().toString()+ audioFile.name);
    
    // Upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, audioFile);
    //const uploadTask = storageRef.put(audioFile);

    // Monitor the upload process
    uploadTask.on('state_changed',
        (snapshot) => {
            // Progress monitoring, you can update a progress bar here
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            // Handle errors here
            console.error('Upload error:', error);
        },
        () => {
            // Handle successful upload here
            console.log('Upload successful!');
            // You can get the download URL to the uploaded file
            //uploadTask.snapshot.ref.getDownloadURL().
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                cb(downloadURL);
            });
        }
    );
}
export default uploadAudio;




/*


const storage = getStorage();
//const storageRef = ref(storage, 'images/rivers.jpg');


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion


uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      cb(downloadURL)
    });
  }
);

*/