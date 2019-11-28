import server from './server';
import { connectToDatabase, createModels } from '@/helpers';

connectToDatabase();
createModels();

export default server;
