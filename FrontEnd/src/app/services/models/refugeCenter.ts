import { Case } from "../../models/Case";

export interface RefugeCenter {
  id?: number;
  name: string;
  capacity: number;
  caseId?: number;
  location: string;
  cases?: Case[];
}
