import { IBoard } from '../types/types';
import RepositoryMaintenance from './repository_maintenance';

export const boards: IBoard[] = [];
const boardsDB = new RepositoryMaintenance(boards);

export default boardsDB;
