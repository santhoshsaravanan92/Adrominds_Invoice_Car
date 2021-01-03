import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DashboardService } from "./service/dashboard.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {
  DashboardForm: FormGroup;
  errorMessage: string = "";
  submitted: boolean = false;

  spare: number = 0;
  salary: number = 0;
  others: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.DashboardForm = this.formBuilder.group({
      fromDate: [""],
      toDate: [""],
    });

    this.updateDashBoard({ fromDate: "", toDate: "" });
  }

  get getFormControls() {
    return this.DashboardForm.controls;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  updateDashBoard(formData) {
    if (!formData.fromDate && !formData.toDate) {
      var date = new Date();
      let d = new Date(date.getFullYear(), date.getMonth(), 1)
        .toLocaleDateString()
        .split("/");
      formData.fromDate = `${d[2]}-${d[1]}-${d[0]}`;

      let t = new Date(
        date.getFullYear(),
        date.getMonth(),
        this.daysInMonth(date.getMonth() + 1, date.getFullYear())
      )
        .toLocaleDateString()
        .split("/");
      formData.toDate = `${t[2]}-${t[1]}-${t[0]}`;
    }

    this.dashboardService
      .getExpenseDashboardDetails(formData.fromDate, formData.toDate)
      .subscribe((result) => {
        result.map((value) => {
          if (value.category === "Salary") {
            this.salary = value.price > 0 ? value.price : 0;
          } else if (value.category === "Spare") {
            this.spare = value.price > 0 ? value.price : 0;
          } else {
            this.others = value.price > 0 ? value.price : 0;
          }
        });
      }),
      (err) => {
        console.log(err);
      };
  }

  clearForm() {
    this.DashboardForm.reset();
  }
}
