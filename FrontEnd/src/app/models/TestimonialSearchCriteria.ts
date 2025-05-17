export class TestimonialSearchCriteria {
    content?: string;
    dateFrom?: Date;
    dateTo?: Date;
    testimonialTitle?: string;
    sentiment?: string; // Renommé pour correspondre à Testimonial.testimonialTitle

    constructor(
        content?: string,
        dateFrom?: Date,
        dateTo?: Date,
        testimonialTitle?: string
    ) {
        this.content = content;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.testimonialTitle = testimonialTitle;
    }
}