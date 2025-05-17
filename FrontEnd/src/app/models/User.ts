import { Association } from './Association';

import { Role } from './Role';
export class User {
    userId!: number; // Optional for updates
    username!: string;
    email!: string;
    password!: string;
    role!: Role;
    birthDate!: string; // Stored as a string in ISO format (yyyy-MM-dd)
    badges!: string;
    points!: number;
    provider!: string;}