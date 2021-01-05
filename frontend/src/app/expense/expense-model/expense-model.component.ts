import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUserEmail, getTodayDate } from "src/app/helpers/utilities";
import { ExpenseInformation } from "../models/expense.model";
import { ExpenseService } from "../services/expense.service";

@Component({
  selector: "app-expense-model",
  templateUrl: "./expense-model.component.html",
  styleUrls: ["./expense-model.component.sass"],
})
export class ExpenseModelComponent implements OnInit {
  expenseForm: FormGroup;
  _title: string = "";
  submitted: boolean = false;
  _isEdit: boolean = false;
  selectedDateValidationPurpose = "";
  private _modalDataToPass: any;
  private _id: string = "";
  categories: any = ["Spare", "Salary", "Others"];

  @Input("modalDataToPass")
  set modalDataToPass(value: any) {
    if (value) {
      this._modalDataToPass = value;
      this._id = this._modalDataToPass.id;
      this._isEdit = this._modalDataToPass.isEdit;
      this.expenseForm.reset();
      this._title = this._modalDataToPass.isEdit
        ? "Edit Expense Information"
        : "Add Expense Information";
      if (this._id != "") this.getExpenseRecordById(this._id);
    }
  }

  @Output("emitData")
  emitData = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expenseFormCreation();
  }

  expenseFormCreation() {
    this.expenseForm = this.formBuilder.group({
      date: [getTodayDate(), [Validators.required]],
      category: ["", [Validators.required]],
      price: ["", [Validators.required]],
      notes: ["", [Validators.required]],
      id: [""], // for edit purpose
    });
  }

  get getExpenseFormControls() {
    return this.expenseForm.controls;
  }

  changeCategory(e) {
    this.expenseForm.get("category").setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get getchangeCategory() {
    return this.expenseForm.get("category");
  }

  getExpenseRecordById(id: string) {
    if (id) {
      this.expenseService.getExpensesById(id).subscribe((expenseRecord) => {
        const expenseFromControls = this.getExpenseFormControls;
        expenseFromControls["category"].setValue(expenseRecord.category);
        expenseFromControls["date"].setValue(expenseRecord.date);
        this.selectedDateValidationPurpose = expenseRecord.date;
        expenseFromControls["notes"].setValue(expenseRecord.notes);
        expenseFromControls["price"].setValue(expenseRecord.price);
        expenseFromControls["id"].setValue(id);
      }),
        (err) => {
          console.log(err);
        };
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.emitData.emit("closemodal");
    this.expenseForm.reset();
    this.submitted = false;
  }

  saveExpense() {
    this.submitted = true;
    if (this.expenseForm.invalid) return;

    const expense = new ExpenseInformation();
    const expenseFormControls = this.getExpenseFormControls;
    let category = expenseFormControls["category"].value;
    expense.Category = category.split(" ")[1];
    expense.Date = expenseFormControls["date"].value.toLocaleDateString();
    expense.Notes = expenseFormControls["notes"].value;
    expense.Price = expenseFormControls["price"].value;
    expense.Email = getLoggedInUserEmail();

    this.expenseService.addExpense(expense).subscribe((data) => {
      if (data.message === "expense added") {
        this.closeModal();
        this.emitData.emit("added");
      }
    }),
      (err) => {
        this.emitData.emit("error");
      };
  }

  updateExpenseRecordById() {
    this.submitted = true;
    if (this.expenseForm.invalid) {
      this.emitData.emit("check form data");
      return;
    }

    const expense = new ExpenseInformation();
    const expenseFromControls = this.getExpenseFormControls;

    let category = expenseFromControls["category"].value;
    expense.Category = category.split(" ")[1];
    expense.Date =
      this.selectedDateValidationPurpose === expenseFromControls["date"].value
        ? expenseFromControls["date"].value
        : expenseFromControls["date"].value.toLocaleDateString();
    expense.Notes = expenseFromControls["notes"].value;
    expense.Price = expenseFromControls["price"].value;
    expense.Email = getLoggedInUserEmail();
    expense.Id = expenseFromControls["id"].value;

    this.expenseService.updateExpenseById(expense).subscribe((data) => {
      if (data.message === "expense updated") {
        this.closeModal();
        this.emitData.emit("updated");
      } else {
        this.emitData.emit("error");
      }
    }),
      (err) => {
        this.emitData.emit("error");
      };
  }
}
