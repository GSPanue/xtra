import server from './server';
import { connectToDatabase, createModels, createStrategies } from '@/helpers';

connectToDatabase();
createModels();
createStrategies();

export default server;
