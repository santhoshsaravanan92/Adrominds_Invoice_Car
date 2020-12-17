import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { Constants } from "../helpers/constant";
import { getLoggedInUserEmail } from "../helpers/utilities";
import { ExpenseInformation } from "./models/expense.model";
import { ExpenseService } from "./services/expense.service";

@Component({
  selector: "app-expense",
  templateUrl: "./expense.component.html",
  styleUrls: ["./expense.component.sass"],
})
export class ExpenseComponent implements OnInit {
  loadAddEditModal: boolean = false;
  gridDatas = [];
  isLoadingDone: boolean = false;
  modalDataToPass: any;

  constructor(
    public messageService: MessageService,
    private expenseService: ExpenseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  openDialog() {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      id: "",
      isEdit: false,
    };
  }

  editExpense(id: string) {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      id: id,
      isEdit: true,
    };
  }

  handleEmittedData($event) {
    if ($event == "closemodal") this.loadAddEditModal = false;
    else if ($event == "added") {
      this.getAllExpenses();
      this.updateToastMessage(
        "Expense Added successfully",
        Constants.success,
        "Expense Information"
      );
    } 
    else if ($event == "updated") {
      this.getAllExpenses();
      this.updateToastMessage(
        "Expense Updated successfully",
        Constants.success,
        "Expense Information"
      );
    }
    else if ($event == "check form data") {
      this.getAllExpenses();
      this.updateToastMessage(
        "All form fields are mandatory.",
        Constants.error,
        "Expense Information"
      );
    }
    else {
      this.updateToastMessage(
        "Something went wrong. Please try again later.",
        Constants.error,
        "Expense Information"
      );
    }
  }

  updateToastMessage(msg, severity, title) {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: msg,
    });
  }

  getAllExpenses() {
    this.isLoadingDone = true;
    this.expenseService
      .getAllExpenses(getLoggedInUserEmail())
      .subscribe((data) => {
        if (data.length > 0) {
          let datas = [];
          data.forEach((e) => {
            let a = new ExpenseInformation();
            a.Category = e.Category;
            a.Date = e.Date;
            a.Notes = e.Notes;
            a.Price = e.Price;
            a.Id = e.Id;
            datas.push(a);
          });
          this.gridDatas = data;
        }

        this.isLoadingDone = false;
      }),
      (err) => {
        console.log(err);
      };
  }

  deleteExpense(id) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the expense`,
      header: "Delete Expense",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (id !== "") {
          this.expenseService
            .deleteExpense(id)
            .subscribe((res) => {
              if (res.message === "expense deleted") {
                this.getAllExpenses();
                this.updateToastMessage(
                  "Expense Information Deleted Successfully",
                  Constants.success,
                  "Expense Information"
                );
              }
            });
        }
      },
      reject: () => {},
    });
  }
}
