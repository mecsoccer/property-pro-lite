import express from 'express';
import http from 'http';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './routes/index';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', apiRouter);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, '0.0.0.0');

export default server;
