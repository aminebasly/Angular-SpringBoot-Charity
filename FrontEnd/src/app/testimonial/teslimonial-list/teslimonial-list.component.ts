import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Testimonial } from 'src/app/models/Testimonial';
import { TestimonialSearchCriteria } from 'src/app/models/TestimonialSearchCriteria';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';

interface ReportDto {
  total: number;
  positive: SentimentSummary;
  neutral: SentimentSummary;
  negative: SentimentSummary;
  summary: string;
}

interface SentimentSummary {
  count: number;
  percent: number;
  commonPhrases: string[];
}

@Component({
  selector: 'app-teslimonial-list',
  templateUrl: './teslimonial-list.component.html',
  styleUrls: ['./teslimonial-list.component.css']
})
export class TeslimonialListComponent {
  testimonials: Testimonial[] = [];
  searchForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private testimonialService: TestimonialService,
    private router: Router,
    private http: HttpClient
  ) {
    this.searchForm = this.fb.group({
      content: [''],
      dateFrom: [null],
      dateTo: [null],
      testimonialTitle: ['']
    });
  }

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.testimonialService.getAllTestimonials().subscribe({
      next: (data) => {
        console.log('Loaded testimonials:', data);
        this.testimonials = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error loading testimonials: ' + err.message;
      }
    });
  }

  resetSearch(): void {
    this.searchForm.reset({ content: '', dateFrom: null, dateTo: null, testimonialTitle: '' });
    this.loadTestimonials();
  }

  searchTestimonials(): void {
    const criteria: TestimonialSearchCriteria = this.searchForm.value;
    console.log('Search criteria:', criteria);
    this.testimonialService.searchTestimonials(criteria).subscribe({
      next: (results) => {
        console.log('Search results:', results);
        this.testimonials = results;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Search error:', err);
        this.errorMessage = 'Error searching testimonials: ' + err.message;
      }
    });
  }

  deleteTestimonial(testimId: number): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.testimonialService.deleteTestimonial(testimId).subscribe({
        next: () => {
          this.testimonials = this.testimonials.filter(t => t.testimId !== testimId);
          this.errorMessage = '';
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/testimonials']);
          });
        },
        error: (err) => {
          this.errorMessage = 'Error deleting testimonial: ' + err.message;
        }
      });
    }
  }

  downloadReport(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.http.get<ReportDto>('http://localhost:8082/testimonials/analysis').subscribe({
      next: (report) => {
        console.log('Report response:', report);
        if (!report || !report.positive || !report.neutral || !report.negative) {
          this.errorMessage = 'Invalid report data received.';
          this.isLoading = false;
          return;
        }

        const doc = new jsPDF();
        let yOffset = 20;

        // Title
        doc.setFontSize(18);
        doc.text('Testimonial Analysis Report', 20, yOffset);
        yOffset += 10;

        // Total Testimonials
        doc.setFontSize(12);
        doc.text(`Total Testimonials: ${report.total || 0}`, 20, yOffset);
        yOffset += 10;

        // Positive Sentiment
        doc.setFontSize(14);
        doc.text('Positive Sentiment', 20, yOffset);
        yOffset += 8;
        doc.setFontSize(12);
        doc.text(`Count: ${report.positive.count || 0}`, 20, yOffset);
        yOffset += 6;
        doc.text(`Percentage: ${(report.positive.percent || 0).toFixed(2)}%`, 20, yOffset);
        yOffset += 6;
        doc.text(`Common Phrases: ${(report.positive.commonPhrases || []).join(', ') || 'None'}`, 20, yOffset);
        yOffset += 10;

        // Neutral Sentiment
        doc.setFontSize(14);
        doc.text('Neutral Sentiment', 20, yOffset);
        yOffset += 8;
        doc.setFontSize(12);
        doc.text(`Count: ${report.neutral.count || 0}`, 20, yOffset);
        yOffset += 6;
        doc.text(`Percentage: ${(report.neutral.percent || 0).toFixed(2)}%`, 20, yOffset);
        yOffset += 6;
        doc.text(`Common Phrases: ${(report.neutral.commonPhrases || []).join(', ') || 'None'}`, 20, yOffset);
        yOffset += 10;

        // Negative Sentiment
        doc.setFontSize(14);
        doc.text('Negative Sentiment', 20, yOffset);
        yOffset += 8;
        doc.setFontSize(12);
        doc.text(`Count: ${report.negative.count || 0}`, 20, yOffset);
        yOffset += 6;
        doc.text(`Percentage: ${(report.negative.percent || 0).toFixed(2)}%`, 20, yOffset);
        yOffset += 6;
        doc.text(`Common Phrases: ${(report.negative.commonPhrases || []).join(', ') || 'None'}`, 20, yOffset);
        yOffset += 10;

        // Summary
        doc.setFontSize(14);
        doc.text('Summary', 20, yOffset);
        yOffset += 8;
        doc.setFontSize(12);
        doc.text(report.summary || 'No summary available', 20, yOffset, { maxWidth: 170 });

        // Save the PDF
        const date = new Date().toISOString().split('T')[0];
        doc.save(`testimonial-report-${date}.pdf`);
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Report error:', err);
        this.errorMessage = 'Error generating report: ' + err.message;
        this.isLoading = false;
      }
    });
  }
}