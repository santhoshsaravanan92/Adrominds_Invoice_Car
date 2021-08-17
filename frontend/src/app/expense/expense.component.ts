import { TmplAstRecursiveVisitor } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
  isLoading: boolean = false;
  isLoadingDone: boolean = false;
  modalDataToPass: any;
  categories: any = ["Spare", "Salary", "Others"];
  expenseFilterForm: FormGroup;
  initialValue;
  constructor(
    public messageService: MessageService,
    private expenseService: ExpenseService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllExpenses();
    this.expenseFilterFormCreation();
  }

  expenseFilterFormCreation() {
    this.expenseFilterForm = this.formBuilder.group({
      category: [""],
      fromdate: [""],
      todate: [""],
    });
    this.initialValue = this.expenseFilterForm.value;
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
    } else if ($event == "updated") {
      this.getAllExpenses();
      this.updateToastMessage(
        "Expense Updated successfully",
        Constants.success,
        "Expense Information"
      );
    } else if ($event == "check form data") {
      this.getAllExpenses();
      this.updateToastMessage(
        "All form fields are mandatory.",
        Constants.error,
        "Expense Information"
      );
    } else {
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
          this.gridDatas = [];
          data.forEach((e) => {
            let a = new ExpenseInformation();
            a.category = e.category;
            a.dated = e.dated;
            a.notes = e.notes;
            a.price = e.price;
            a.id = e.id;
            this.gridDatas.push(a);
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
      message: `Are you sure that you want to delete the expense 🤔`,
      header: "Delete Expense",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (id !== "") {
          this.isLoading = true;
          this.expenseService.deleteExpense(id).subscribe((res) => {
            if (res.message === "expense deleted") {
              this.getAllExpenses();
              this.updateToastMessage(
                "Expense Information Deleted Successfully 😃",
                Constants.success,
                "Expense Information"
              );
              this.isLoading = false;
            }
          });
        }
      },
      reject: () => {},
    });
  }

  changeCategory(e) {
    this.expenseFilterForm.get("category").setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get getchangeCategory() {
    return this.expenseFilterForm.get("category");
  }

  private getToDate() {
    var dateNow = new Date();
    return new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() + 1,
      0
    ).toLocaleDateString();
  }

  private getFromDate() {
    var dateNow = new Date();
    return new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      1
    ).toLocaleDateString();
  }

  applyFilter(formData) {
    const category = formData.category.includes(" ")
      ? formData.category.split[" "]
      : formData.category;
    const fromDate =
      formData.fromdate != "" && formData.fromdate != null
        ? formData.fromdate.toLocaleDateString()
        : this.getFromDate();
    const toDate =
      formData.todate != "" && formData.todate != null
        ? formData.todate.toLocaleDateString()
        : this.getToDate();

    this.isLoading = true;
    this.expenseService
      .getExpenseDetailsForFilter(category, fromDate, toDate)
      .subscribe((data) => {
        if (data.length > 0) {
          this.gridDatas = [];
          data.forEach((e) => {
            let a = new ExpenseInformation();
            a.category = e.category;
            a.dated = e.dated;
            a.notes = e.notes;
            a.price = e.price;
            a.id = e.id;
            this.gridDatas.push(a);
            this.isLoading = false;
          });
        } else {
          this.updateToastMessage(
            "No data for the filter 😔. So loaded all data",
            Constants.error,
            "Expense information"
          );
          this.getAllExpenses();
          this.isLoading = false;
        }
      });
  }

  clearForm() {
    this.expenseFilterForm.reset(this.initialValue);
    this.getAllExpenses();
  }
}
