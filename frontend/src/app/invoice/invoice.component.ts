import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.sass"],
})
export class InvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  invoiceFormSubmitted: boolean = false;
  isLoadingDone: boolean = false;
  loadCustomerPage: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.invoiceFormCreation();
  }

  invoiceFormCreation() {
    this.invoiceForm = this.formBuilder.group({
      customername: ["", [Validators.required]],
      deliverynotes: [""],
      ordernumber: [""],
      vehiclenumber: [""],
      othernotes: [""],
      templatename: [""],
      mode: [""],
      dated: [""],
      model: [""],
      kmdriver: [""],
      description: [""],
      rate: [""],
      quantity: [""],
      price: [""],
      sgst: [""],
      cgst: [""],
      discount: [""],
      amount: [""],
    });
  }

  get getInvoiceFormControls() {
    return this.invoiceForm.controls;
  }

  addItemBtnclick() {
    let controlsFormControls = this.getInvoiceFormControls;
     const price = controlsFormControls['price'].value;
     const desc = controlsFormControls[''].value
  }

  openCustomerpage() {
    this.loadCustomerPage = true;
  }
}
