import { User } from './User';

import { Case } from './Case';
export class Association {
    associationId!: number; // Optional field (used for updates)
    name!: string;
    associationDescription!: string;
    foundingDate!: Date; // Use string for date handling in JSON
    
    users!: User[]; // Association can have multiple users
    category?: string;// Optional field for category
    cases!: Case[]; // Association can have multiple cas
}