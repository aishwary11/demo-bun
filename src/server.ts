import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import 'dotenv/config';
import type { Express, Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import pc from 'picocolors';
import logger from './middleware/logger';
const app: Express = express();
const port: number = 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);
app.post('/', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const {
    response: { text },
  } = await model.generateContent([prompt]);
  res.status(200).json({ msg: 'hello', result: text() });
});

app.listen(port, () => console.log(`Server Started at port: ${pc.yellow(port)}`));
