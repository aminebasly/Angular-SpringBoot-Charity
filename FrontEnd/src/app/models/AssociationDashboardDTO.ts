export interface AssociationDashboardDTO {
    totalAssociations: number;
    validatedAssociations: number;
    unvalidatedAssociations: number;
    associations: AssociationSummaryDTO[];
  }
  
  export interface AssociationSummaryDTO {
    associationId: number;
    name: string;
    
    documentCount: number;
  }