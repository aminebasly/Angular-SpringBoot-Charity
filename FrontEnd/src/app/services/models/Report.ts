export interface TestimonialReport {
    total: number;
    positiveSummary: SentimentSummary;
    neutralSummary: SentimentSummary;
    negativeSummary: SentimentSummary;
    summary: string;
  }
  
  export interface SentimentSummary {
    count: number;
    percentage: number;
    commonPhrases: string[];
  }