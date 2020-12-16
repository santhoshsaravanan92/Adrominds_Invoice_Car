import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getLoggedInUserEmail } from 'src/app/helpers/utilities';
import { ExpenseInformation } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';

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

  constructor(private formBuilder: FormBuilder,
    private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseFormCreation();
  }

  expenseFormCreation() {
    this.expenseForm = this.formBuilder.group({
      date: [new Date().toLocaleDateString("en-US"), [Validators.required]],
      category: ["", [Validators.required]],
      price: ["", [Validators.required]],
      notes: ["", [Validators.required]],
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

  getExpenseRecordById(id) {}

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
    expense.Category = category.split(' ')[1];
    expense.Date = expenseFormControls["date"].value;
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

  updateExpenseRecordById() {}
}
