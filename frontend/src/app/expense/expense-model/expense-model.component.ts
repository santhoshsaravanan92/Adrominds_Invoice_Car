import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  getDateddmmyyyyformat,
  getLoggedInUserEmail,
  getTodayDate,
} from "src/app/helpers/utilities";
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
  isLoading: boolean = false;
  private _modalDataToPass: any;
  private _id: string = "";
  categories: any = ["Spare", "Salary", "Others"];

  @Input("modalDataToPass")
  set modalDataToPass(value: any) {
    
    if (value) {
      this._modalDataToPass = value;
      this._id = this._modalDataToPass.id;
      this._isEdit = this._modalDataToPass.isEdit;
      //this.expenseForm.reset();
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
      date: [new Date(), [Validators.required]],
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
      this.isLoading = true;
      this.expenseService.getExpensesById(id).subscribe((expenseRecord) => {
        const expenseFromControls = this.getExpenseFormControls;
        expenseFromControls["category"].setValue(expenseRecord.category);
        this.selectedDateValidationPurpose = getDateddmmyyyyformat(expenseRecord.dated);
        //this.selectedDateValidationPurpose = expenseRecord.dated;
        expenseFromControls["date"].setValue(
          this.selectedDateValidationPurpose
        );
        expenseFromControls["notes"].setValue(expenseRecord.notes);
        expenseFromControls["price"].setValue(expenseRecord.price);
        expenseFromControls["id"].setValue(id);
        this.isLoading = false;
      }),
        (err) => {
          console.log(err);
          this.isLoading = false;
        };
    } else {
      this.closeModal();
      this.isLoading = false;
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
    this.isLoading = true;
    const expense = new ExpenseInformation();
    const expenseFormControls = this.getExpenseFormControls;
    let category = expenseFormControls["category"].value;
    expense.category = category.split(" ")[1];
    expense.dated = expenseFormControls["date"].value.toLocaleDateString();
    expense.notes = expenseFormControls["notes"].value;
    expense.price = expenseFormControls["price"].value;
    expense.email = getLoggedInUserEmail();

    this.expenseService.addExpense(expense).subscribe((data) => {
      if (data.message === "expense added") {
        this.isLoading = false;
        this.closeModal();
        this.emitData.emit("added");
      }
    }),
      (err) => {
        this.isLoading = false;
        this.emitData.emit("error");
      };
  }

  updateExpenseRecordById() {
    
    this.submitted = true;
    if (this.expenseForm.invalid) {
      this.emitData.emit("check form data");
      return;
    }
    this.isLoading = true;

    const expense = new ExpenseInformation();
    const expenseFromControls = this.getExpenseFormControls;

    let category = expenseFromControls["category"].value;
    expense.category = category.split(" ")[1];
    expense.dated =
      this.selectedDateValidationPurpose === expenseFromControls["date"].value
        ? expenseFromControls["date"].value
        : expenseFromControls["date"].value.toLocaleDateString();
    expense.notes = expenseFromControls["notes"].value;
    expense.price = expenseFromControls["price"].value;
    expense.email = getLoggedInUserEmail();
    expense.id = expenseFromControls["id"].value;

    this.expenseService.updateExpenseById(expense).subscribe((data) => {
      this.isLoading = false;
      if (data.message === "expense updated") {
        this.closeModal();
        this.emitData.emit("updated");
      } else {
        this.emitData.emit("error");
      }
    }),
      (err) => {
        this.isLoading = false;
        this.emitData.emit("error");
      };
  }
}
