import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DonService } from 'src/app/FrontOffice/serviceDon/don.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
  displayedColumns: string[] = ['donationId', 'donTitle', 'donDescription', 'donType', 'donDate'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // Variables pour les statistiques
  totalDonations: any;
  donationsByType: any;
  donationsByMonth: any;
  donationsByYear: any;

  predictionResult: string = '';

  constructor(private donService: DonService) {}

  ngOnInit(): void {
    // Récupérer la liste des dons
    this.donService.ListDon().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Erreur lors de la récupération des donations:', error);
      }
    );

    // Récupérer les dons totaux
    this.donService.getTotalDonations().subscribe(
      (data: any) => this.totalDonations = data,
      (error: any) => console.error('Erreur lors de la récupération des statistiques :', error)
    );

    // Récupérer les dons par type
    this.donService.getDonationsByType().subscribe(
      (data: any) => this.donationsByType = data,
      (error: any) => console.error('Erreur lors de la récupération des statistiques par type:', error)
    );

   

    // Récupérer les dons par année
    this.donService.getDonationsByYear().subscribe(
      (data: any) => this.donationsByYear = data,
      (error: any) => console.error('Erreur lors de la récupération des statistiques par année:', error)
    );
  }

  // Fonction d'exportation en PDF
  exportPDF(): void {
    this.donService.exportDonationsToPDF().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'donations.pdf';
        a.click();
      },
      (error: any) => {
        console.error('Erreur lors de l\'exportation en PDF:', error);
      }
    );
  }

  predictDonation() {
    this.donService.getPrediction().subscribe({
      next: (result) => this.predictionResult = result,
      error: (err) => this.predictionResult = 'Erreur !'
    });
  }
}
