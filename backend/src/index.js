import server from './server';
import { connectToDatabase } from '@/helpers';

connectToDatabase();

export default server;
