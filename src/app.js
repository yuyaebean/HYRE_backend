import { GraphQLServer } from 'graphql-yoga';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';

import schema from './schema';
import './passport';
import { authenticateAdmin, authenticateUser } from './passport';
import { isAdmin, isUser, isAdminOrUser } from './middlewares';
import { uploadMiddleware } from './upload';

// Set environment
dotenv.config();
const PORT = process.env.PORT || 4000;

// Create server
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAdmin, isUser, isAdminOrUser })
});
server.express.use(logger('dev'));
server.express.use(authenticateAdmin);
server.express.use(authenticateUser);

// Handle file upload
server.express.post('/api/upload', cors(), uploadMiddleware, (req, res) => {
  const {
    file: { location }
  } = req;
  res.json({ location });
});

server.start({ port: PORT }, () =>
  console.log(`Server is now running on http://localhost:${PORT}`)
);
