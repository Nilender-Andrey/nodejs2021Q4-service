import { ITask } from '../types/types';
import RepositoryMaintenance from './repository_maintenance';

const tasks: ITask | [] = [];
const tasksDB = new RepositoryMaintenance(tasks);

export default tasksDB;
