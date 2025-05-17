import { Component, OnInit } from "@angular/core";
import { CaseControllerService } from "../../services/servicess/case-controller.service";
import { Case } from "../../services/models/case";
import { GeminiServiceService } from "../../services/servicess/gemini-service.service";
import { RefugeCenterService } from "../../services/servicess/refuge-center.service";
import { RefugeCenter } from "../../services/models/refugeCenter";

@Component({
  selector: "app-case-list",
  templateUrl: "./case-list.component.html",
  styleUrls: ["./case-list.component.css"],
})
export class CaseListComponent implements OnInit {
  cases: Case[] = [];
  refugeCenter: RefugeCenter | null = null;
  isRefugeSelected: boolean = false;
  // 🆕 List of available case types
  caseTypes: string[] = [
    "MEDICAL",
    "EDUCATION",
    "EMERGENCY",
    "FOOD",
    "HOUSING",
    "SDF",
    "POOR",
    "SINGLE_MUM",
    "OTHER",
  ];

  // Format a Date into YYYY-MM-DD
  formatDate(date: Date): string {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-"); // Format YYYY-MM-DD
  }

  // Initialisation d'un nouveau cas pour le formulaire
  newCase: Case = {
    identificationNumber: "",
    title: "",
    caseDescription: "",
    location: "",
    caseDate: this.formatDate(new Date()),
    caseStatus: "PENDING", // Valeur par défaut
    caseType: "OTHER", // 🆕 Default case type
    association: {
      associationId: 10,
    },
  };

  constructor(
    private caseService: CaseControllerService,
    private refugeCenterService: RefugeCenterService,
    private geminiService: GeminiServiceService
  ) {}

  ngOnInit(): void {
    console.log("CaseListComponent loaded!");
    this.loadCases();
  }

  // Load all cases
  loadCases(): void {
    this.caseService.getAllCases().subscribe({
      next: (data) => {
        console.log("Data received from API:", data);
        if (data && Array.isArray(data)) {
          this.cases = data;
        } else {
          console.error("Incorrect data format", data);
          this.cases = [];
        }
      },
      error: (err) => {
        console.error("Error while loading cases", err);
        this.cases = [];
      },
    });
  }

  // Delete a case
  deleteCase(caseId: number): void {
    if (confirm("Are you sure you want to delete this case?")) {
      this.caseService.deleteCase({ id: caseId }).subscribe({
        next: () => this.loadCases(),
        error: (err) => console.error("Error while deleting case", err),
      });
    }
  }

  // Update the status of a case
  updateCaseStatus(
    caseId: number,
    status: "PENDING" | "IN_PROGRESS" | "RESOLVED"
  ): void {
    this.caseService.updateCaseStatus({ id: caseId, status }).subscribe({
      next: () => this.loadCases(),
      error: (err) => console.error("Error while updating case status", err),
    });
  }

  // Add a new case
  registerCase(): void {
    this.caseService
      .registerCase({
        body: {
          newCase: this.newCase,
          isCenterSelected: this.isRefugeSelected,
          refugeCenterId: this.refugeCenter?.id,
        },
      })
      .subscribe({
        next: () => {
          this.loadCases();
          this.resetForm();
        },
        error: (err) => console.error("Error while adding case", err),
      });
  }

  // Reset the form after submission
  resetForm(): void {
    this.newCase = {
      identificationNumber: "",
      title: "",
      caseDescription: "",
      location: "",
      caseDate: this.formatDate(new Date()),
      caseStatus: "PENDING",
      caseType: "OTHER", // 🆕 Reset case type too
      recommendations: undefined, // 🆕 reset it too
    };
    this.refugeCenter = null;
    this.isRefugeSelected = false;
  }
  onDescriptionBlur(): void {
    const description = this.newCase.caseDescription?.trim() || "";
    const wordCount = description.split(/\s+/).length;

    if (wordCount > 3) {
      console.log("Predicting case type based on description...");
      this.geminiService.predictCaseType(description).subscribe({
        next: (response) => {
          const prediction =
            response?.candidates?.[0]?.content?.parts?.[0]?.text
              ?.trim()
              .toUpperCase();
          if (prediction && this.caseTypes.includes(prediction)) {
            this.newCase.caseType = prediction;
            console.log("Predicted case type:", prediction);

            // Generate recommendation immediately after prediction
            this.generateRecommendation(description, prediction);
          } else {
            console.warn("Prediction not recognized:", prediction);
          }
        },
        error: (err) => {
          console.error("Error predicting case type", err);
        },
      });
    } else {
      console.log("Description too short, skipping prediction.");
    }
  }

  generateRecommendation(description: string, caseType: string): void {
    console.log("Generating recommendation...");
    this.geminiService.generateRecommendation(description, caseType).subscribe({
      next: (response) => {
        const recommendation =
          response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (recommendation) {
          this.newCase.recommendations = recommendation; // 🆕 Directly store inside newCase
          console.log("Generated recommendation:", recommendation);
        } else {
          this.newCase.recommendations = undefined;
          console.warn("No recommendation generated.");
        }
      },
      error: (err) => {
        this.newCase.recommendations = undefined;
        console.error("Error generating recommendation", err);
      },
    });
  }

  onLocationChange() {
    const casee = this.newCase.caseType;
    if (["HOUSING", "SDF"].includes(casee) && this.newCase.location != "") {
      this.refugeCenterService
        .searchForLocation(this.newCase.location)
        .subscribe((data) => {
          if (data) {
            this.refugeCenter = data;
          } else {
            this.refugeCenter = null;
            this.isRefugeSelected = false;
          }
        });
    } else {
      this.refugeCenter = null;
      this.isRefugeSelected = false;
    }
  }
}
