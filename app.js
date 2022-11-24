import { Server } from "./models/Server.js";
import * as dotenv from 'dotenv';
dotenv.config();



const server = new Server();



server.listen();


