import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import app from "./app.js";
configDotenv();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to DB');
    app.listen(3000, () => console.log('Server running......'));
})


