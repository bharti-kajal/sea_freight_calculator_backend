import express from'express';
import cors from 'cors';
import router from './config/routes.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api", router);

const PORT = process.env.PORT || 3200;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
