import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RefugeCenter } from "../../../services/models/refugeCenter";
import { RefugeCenterService } from "../../../services/servicess/refuge-center.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  @Input() centerToEdit!: RefugeCenter | null;
  @Output() formIsSubmitted = new EventEmitter();
  constructor(private refugeService: RefugeCenterService) {}
  refugeCenter = {
    name: this.centerToEdit ? this.centerToEdit.name : "",
    capacity: this.centerToEdit ? this.centerToEdit.capacity : 0,
    location: this.centerToEdit ? this.centerToEdit.location : "",
  };

  submitForm() {
    if (this.centerToEdit) {
      this.refugeService
        .update(this.centerToEdit.id!, this.refugeCenter!)
        .subscribe(() => {
          this.formIsSubmitted.emit();
        });
    } else {
      this.refugeService.create(this.refugeCenter!).subscribe(() => {
        this.formIsSubmitted.emit();
      });
    }
  }
}
