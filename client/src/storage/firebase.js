// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { configDotenv } from "dotenv";
//import { getStorage } from "firebase/storage";
//configDotenv();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apikey,//"AIzaSyDsukNhzXqBUrCVN8XbWiesgGL1IMvQLrw",
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const storage = getStorage(app);
//const analytics = getAnalytics(app);
export default app;

/*

const express = require('express');
const admin = require('firebase-admin');
const Multer = require('multer');
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-firebase-storage-bucket-url',
});

// Create a Multer storage engine to handle file uploads
const storage = Multer.memoryStorage();
const upload = Multer({ storage });

// Define an Express route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get a reference to the Firebase Storage bucket
  const bucket = admin.storage().bucket();

  // Define the destination path within the bucket and the file name
  const destinationPath = 'uploads/';
  const fileName = req.file.originalname;

  // Create a file reference
  const file = bucket.file(destinationPath + fileName);

  // Create a writable stream to upload the file
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false, // Set to false for small files
  });

  // Handle stream errors
  stream.on('error', (err) => {
    console.error(err);
    return res.status(500).send('File upload failed.');
  });

  // Handle stream finish (upload complete)
  stream.on('finish', () => {
    res.send('File uploaded to Firebase Storage.');
  });

  // Pipe the file buffer from Multer to the Firebase Storage stream
  stream.end(req.file.buffer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


*/