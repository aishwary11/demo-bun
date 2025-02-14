import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import 'dotenv/config';
import type { Express, Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import pc from 'picocolors';
import { STATUS_CODES } from './common/constant';
import connectDB from './common/db/config';
import userRouter from './components/user/user.route';
import errorMiddleware from './middleware/error.middleware';
import isAuthenticated from './middleware/isAuthenticated';
import logger from './middleware/logger';
import notFound from './middleware/notFound';
const app: Express = express();
const port: number = parseInt(process.env.PORT!) || 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(logger);
app.post('/', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  try {
    const { response } = await model.generateContent([prompt]);
    res.status(STATUS_CODES.CREATED).json({ msg: 'hello', result: response.text() });
  } catch (error) {
    console.error(error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ msg: 'Error generating content', error });
  }
});
app.use('/user', userRouter);
app.use(isAuthenticated);
app.use('*', notFound);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server started at port: ${pc.yellow(port)}`));
