import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import express from "express";
import { swaggerDocs } from '../swagger.js';
dotenv.config();

connectDB();

const app = express();
swaggerDocs(app);
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
