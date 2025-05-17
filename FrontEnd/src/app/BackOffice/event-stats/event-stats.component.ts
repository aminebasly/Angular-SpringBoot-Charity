/*import { Component } from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {EventService} from "../../services/EventService";
import {Category} from "../../models/event";

@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrls: ['./event-stats.component.css']
})
export class EventStatsComponent {
  public chartData: ChartData<'pie'> = { // Initialize with an empty object
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // You can change these colors
    }]
  };
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw + ' events';
          }
        }
      }
    }
  };
  totalEvents: number = 0;
  participationRate: number = 0;
  availabilityRate: number = 0;
  private eventId: number = 0;
  categoryPopularity: Map<Category, number> = new Map();
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartReady: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEventsPerCategory().subscribe(data => {
      this.chartData = {
        labels: Object.keys(data), // Categories (e.g., Music, Tech, Art)
        datasets: [{
          data: Object.values(data), // Number of events per category
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // Custom colors
        }]
      };
    });
    this.eventService.getTotalEvents().subscribe(data => {
      this.totalEvents = data;
    });
    this.eventService.getEventParticipationRate(this.eventId).subscribe(data => {
      this.participationRate = data;
    });
    this.eventService.getEventAvailabilityRate().subscribe(data => {
      this.availabilityRate = data;
    });
  }
  updateCategoryPopularityData(data: Map<Category, number>): void {
    const labels = Array.from(data.keys()); // Convert category keys to labels
    const values = Array.from(data.values()); // Convert category values to popularity data

    // Update the chart data
  }

}*/
