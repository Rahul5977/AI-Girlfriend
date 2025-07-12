import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import userRouter from './routes/user.routes.js';
import chatRouter from './routes/chat.routes.js';

dotenv.config("./.env");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());
connectDB();
app.get('/', (req, res) => {
  res.send(`AI Girlfriend`);
});
app.use("/api/v1/user",userRouter);
app.use("api/v1/chat", chatRouter); // Assuming you want to use the same router for chat as well
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});