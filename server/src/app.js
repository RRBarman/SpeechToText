import express from "express";
import route from "./../routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(express.json())

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/task', taskRouter)
app.use('/api/v2/', route);

export default app;