import { Component, OnInit } from '@angular/core';
import { DonService } from '../serviceDon/don.service';


@Component({
  selector: 'app-affiche-don',
  templateUrl: './affiche-don.component.html',
  styleUrls: ['./affiche-don.component.scss']
})
export class AfficheDonComponent implements OnInit {

  List: any[] = [];
  isDrawerOpen: boolean = false;
  selectedDonation: any = {};

  // 🔹 POUR LA TRADUCTION
  textToTranslate: string = '';
  translatedText: string = '';
  toxicityText: string = '';
  toxicityResult: string = '';


  feedbackText: string = '';
  feedbackInputs: string[] = [];



  constructor(private donService: DonService) {}

    ngOnInit(): void {
        this.donService.ListDon().subscribe(
            (data) => {
                console.log('Donations fetched:', data); // Debugging
                this.List = data;
            },
            (error) => {
                console.error('Error fetching donations:', error);
            }
        );
    }

  openDrawer(donation: any) {
    this.selectedDonation = { ...donation };
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  updateDonation() {
    this.donService.updateDonation(this.selectedDonation.donationId, this.selectedDonation)
        .subscribe(
            (response) => {
              console.log('Donation mise à jour avec succès:', response);
              this.closeDrawer();
              this.ngOnInit(); // Refresh
            },
            (error) => {
              console.error('Erreur lors de la mise à jour:', error);
            }
        );
  }

  // 🔹 TRADUCTION
  translate() {
    if (this.textToTranslate.trim() === '') {
      this.translatedText = "Veuillez entrer un texte à traduire.";
      return;
    }

    // 🔍 D'ABORD CHECK TOXICITÉ
    this.donService.toxicityCheck(this.textToTranslate).subscribe(
        (toxicityResponse: any) => {
          if (toxicityResponse.is_toxic) {
            this.translatedText = "⚠️ Le texte est toxique et ne peut pas être traduit.";
          } else {
            // ✅ SI NON TOXIQUE → TRADUIRE
            this.donService.translateText(this.textToTranslate).subscribe(
                (response: any) => {
                  if (response && response.text) {
                    this.translatedText = response.text;
                  } else {
                    this.translatedText = "Erreur : format de réponse inattendu.";
                  }
                },
                (error) => {
                  console.error('Erreur lors de la traduction:', error);
                  this.translatedText = "Erreur lors de la traduction.";
                }
            );
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification de toxicité:', error);
          this.translatedText = "Erreur lors de la vérification de toxicité.";
        }
    );
  }

  checkToxicityOnly() {
    if (this.toxicityText.trim() === '') {
      this.toxicityResult = "❌ Veuillez entrer un texte.";
      return;
    }

    this.donService.toxicityCheck(this.toxicityText).subscribe(
        (res: any) => {
          if (res.is_toxic) {
            this.toxicityResult = "⚠️ Le texte est toxique.";
          } else {
            this.toxicityResult = "✅ Le texte est non toxique.";
          }
        },
        (err) => {
          console.error("Erreur API:", err);
          this.toxicityResult = "❌ Erreur lors de la vérification.";
        }
    );
  }
  translateDonation(donation: any) {
    if (!donation.donTitle || !donation.donDescription) {
      console.error("Titre ou description manquants pour la traduction.");
      return;
    }

    // Traduire le titre
    this.donService.translateText(donation.donTitle).subscribe(
        (titleRes: any) => {
          if (titleRes && titleRes.text) {
            donation.donTitle = titleRes.text;
          }
        },
        (err) => {
          console.error("Erreur de traduction du titre:", err);
        }
    );

    // Traduire la description
    this.donService.translateText(donation.donDescription).subscribe(
        (descRes: any) => {
          if (descRes && descRes.text) {
            donation.donDescription = descRes.text;
          }
        },
        (err) => {
          console.error("Erreur de traduction de la description:", err);
        }
    );
  }

  readDonation(donation: any) {
    const synth = window.speechSynthesis;
    let text = `Titre : ${donation.donTitle}. Description : ${donation.donDescription}`;
    let utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }

  addFeedback() {
    if (this.feedbackText.trim() === '') {
      alert("⛔ Entrez un feedback !");
      return;
    }

    this.donService.toxicityCheck(this.feedbackText).subscribe((res: any) => {
      if (res.is_toxic) {
        alert("This feedback is toxic and will not be displayed.");
      } else {
        this.feedbackInputs.push(this.feedbackText);
        this.feedbackText = '';
      }
    }, err => {
      console.error(err);
      alert("❌ Erreur lors de la vérification.");
    });
  }



}
