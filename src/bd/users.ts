import { IUser } from '../types/types';
import RepositoryMaintenance from './repository_maintenance';

const users: IUser[] = [];
const usersDB = new RepositoryMaintenance(users);

export default usersDB;
