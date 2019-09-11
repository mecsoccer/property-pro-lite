import express from 'express';
import http from 'http';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import apiRouter from './routes/index';
import swaggerDocument from '../swagger.json';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', apiRouter);

// setup swagger doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* istanbul ignore next */const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, '0.0.0.0');
console.log('server listening at:', port);

export default server;
