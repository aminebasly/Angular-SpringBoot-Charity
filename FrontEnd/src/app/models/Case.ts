// src/app/models/Case.ts
import { Testimonial } from './Testimonial';
import { Association } from './Association';
import { CaseStatus } from './CaseStatus';
;

export class Case {
  caseId!: number; // Optional for updates
  title!: string;
  caseDescription!: string;
  location!: string;
  caseDate!: string; // Date stored as a string in ISO format (yyyy-MM-dd)
  caseStatus!: CaseStatus;

  
  testimonial!: Testimonial; // One-to-One relationship with Testimonial
  association!: Association; // Many-to-One relationship with Association
}