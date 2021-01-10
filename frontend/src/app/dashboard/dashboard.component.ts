import { formatDate } from "@angular/common";
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
  isControlDisabled: boolean = true;
  spare: number = 0;
  salary: number = 0;
  others: number = 0;
  totalInvoiceAmount: number = 0;
  profit: number = 0;
  amt: number = 0; // for calculating profit
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

  dateSelected() {
    this.isControlDisabled = false;
  }

  calenderClearClick() {
    this.isControlDisabled = true;
  }
  updateDashBoard(formData) {
    this.amt = this.salary = this.spare = this.others = 0;
    this.totalInvoiceAmount = this.profit = 0;
    var date = new Date();

    if (formData.fromDate !== "" && formData.fromDate !== null) {
      formData.fromDate = formData.fromDate.toLocaleDateString();
    }
    if (formData.toDate !== "" && formData.toDate !== null) {
      formData.toDate = formData.toDate.toLocaleDateString();
    }

    if (formData.fromDate == "" || formData.fromDate == null) {
      formData.fromDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).toLocaleDateString();
    }
    if (formData.toDate == "" || formData.toDate == null) {
      formData.toDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        this.daysInMonth(date.getMonth() + 1, date.getFullYear())
      ).toLocaleDateString();
    }

    this.dashboardService
      .getExpenseDashboardDetails(formData.fromDate, formData.toDate)
      .subscribe((result) => {
        result.map((value) => {
          if (value.category === "Salary") {
            this.salary =
              this.converToInt(value.price) > 0
                ? this.converToInt(value.price)
                : 0;
          } else if (value.category === "Spare") {
            this.spare =
              this.converToInt(value.price) > 0
                ? this.converToInt(value.price)
                : 0;
          } else {
            this.others =
              this.converToInt(value.price) > 0
                ? this.converToInt(value.price)
                : 0;
          }
          this.amt = this.salary + this.spare + this.others;
        });
      }),
      (err) => {
        console.log(err);
      };

    this.dashboardService
      .getinvoiceDashboardDetails(formData.fromDate, formData.toDate)
      .subscribe((result) => {
        result.map((value) => {
          this.totalInvoiceAmount = value.price > 0 ? value.price : 0;
          this.profit = this.totalInvoiceAmount - this.amt;
        });
      }),
      (err) => {
        console.log(err);
      };
  }

  clearForm() {
    const a = this.getFormControls;
    a["fromDate"].setValue("");
    a["toDate"].setValue("");
  }

  converToInt(data) {
    return parseInt(data);
  }
}
