import { Component, OnInit } from "@angular/core";
import { RefugeCenter } from "../../services/models/refugeCenter";
import { RefugeCenterService } from "../../services/servicess/refuge-center.service";

@Component({
  selector: "app-refuge-center",
  templateUrl: "./refuge-center.component.html",
  styleUrls: ["./refuge-center.component.css"],
})
export class RefugeCenterComponent implements OnInit {
  loading = true;
  errorMessage = "";
  refuges: RefugeCenter[] = [];
  selectedRefuge: RefugeCenter | null = null;
  isOpenForm = false;
  constructor(private refugeService: RefugeCenterService) {}
  ngOnInit(): void {
    this.refetch();
  }
  refetch() {
    this.refugeService.getAll().subscribe((data) => {
      this.refuges = data;
      this.loading = false;
      this.errorMessage = "";

      this.selectedRefuge = null;
      this.isOpenForm = false;
    });
  }
  deleteRefuge(id: number) {
    this.refugeService.delete(id).subscribe(() => this.refetch());
  }
  toggleForm() {
    this.isOpenForm = !this.isOpenForm;
  }
  editRefuge(refuge: RefugeCenter) {
    this.selectedRefuge = refuge;
    this.toggleForm();
  }
}
