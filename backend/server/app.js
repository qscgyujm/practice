import 'dotenv/config';

import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import apiRouter from './route';

const server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.enable('trust proxy');
server.disable('x-powered-by');
server.use(helmet());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

server.use(cors(corsOptions));

server.use('/api', apiRouter)

server.listen(process.env.PORT, () => {
  console.log(`app listening on ${process.env.PORT} port`);
});
