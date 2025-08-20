import express, { type Application, type Request, type Response } from 'express';
import connectDB from './connect.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // if you plan to send cookies
  })
);
connectDB();
const port: string | number = process.env.PORT || 5000;

app.use('/api/auth', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});