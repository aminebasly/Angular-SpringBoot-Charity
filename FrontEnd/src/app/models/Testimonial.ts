import { Case } from './Case';

export class Testimonial {
  testimId!: number;
  testimonialTitle!: string;
  content!: string;
  datePost!: Date;
  associatedCase!: Case;
sentiment: any;

  constructor(
    testimonialTitle: string = '',
    content: string = '',
    datePost: Date = new Date()
  ) {
    this.testimonialTitle = testimonialTitle;
    this.content = content;
    this.datePost = datePost;
  }
}