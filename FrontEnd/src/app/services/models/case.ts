/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Association } from "../models/association";
import { Testimonial } from "../models/testimonial";
export interface Case {
  association?: Association;
  caseDate: string;
  caseDescription: string;
  caseId?: number;
  caseStatus: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  identificationNumber: string;
  location: string;
  testimonial?: Testimonial;
  title: string;
  caseType:
    | "MEDICAL"
    | "EDUCATION"
    | "EMERGENCY"
    | "FOOD"
    | "HOUSING"
    | "SDF"
    | "POOR"
    | "SINGLE_MUM"
    | "OTHER";
  recommendations?: string; // 🆕 Add this line
  // Default type
}
