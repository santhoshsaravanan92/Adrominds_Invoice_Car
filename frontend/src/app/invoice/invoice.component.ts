import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../components/base/base.component";
import { MessageService } from "primeng/api";
import { Constants } from "../helpers/constant";
import { ProductInformation } from "./models/invoice-models";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.sass"],
})
export class InvoiceComponent extends BaseComponent implements OnInit {
  CustomerForm: FormGroup;
  productForm: FormGroup;
  gstForm: FormGroup;
  invoiceFormSubmitted: boolean = false;
  addItemFormsSubmitted: boolean = false;
  isLoadingDone: boolean = false;
  loadCustomerPage: boolean = false;
  gridDatas: ProductInformation[] = [];
  amount: number = 0;
  price: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.CustomerFormCreation();
    this.productFormCreation();
    this.gstFormCreation();
  }

  CustomerFormCreation() {
    this.CustomerForm = this.formBuilder.group({
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
    });
  }

  productFormCreation() {
    this.productForm = this.formBuilder.group({
      description: ["", [Validators.required]],
      rate: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
    });
  }

  gstFormCreation() {
    this.gstForm = this.formBuilder.group({
      sgst: ["8"],
      cgst: ["8"],
      discount: [""],
      amount: ["0"],
      discountoption: [""],
    });
  }

  get getCustomerFormControls() {
    return this.CustomerForm.controls;
  }

  get getProductFormControls() {
    return this.productForm.controls;
  }

  get getGSTFormControls() {
    return this.gstForm.controls;
  }

  addItemBtnclick() {
    this.addItemFormsSubmitted = true;
    let productFormControls = this.getProductFormControls;
    const price = productFormControls["price"].value;
    const description = productFormControls["description"].value;
    const rate = productFormControls["rate"].value;
    const quantity = productFormControls["quantity"].value;

    if (this.productForm.invalid) {
      this.updateToastMessage(
        "All fields are mandatory in Product information",
        Constants.error,
        "Product Information"
      );
      this.addItemFormsSubmitted = false;
      return;
    }
    let productModelObj = new ProductInformation();
    productModelObj.description = description;
    productModelObj.price = price;
    productModelObj.quantity = quantity;
    productModelObj.rate = rate;
    this.amount += price;
    this.gstCalculation();
    this.gridDatas.push(productModelObj);
    this.productForm.reset();
    this.addItemFormsSubmitted = false;
  }

  openCustomerpage() {
    this.loadCustomerPage = true;
  }

  CustomerFormSubmit() {}

  calculateProductPrice() {
    let productFormControls = this.getProductFormControls;
    const rate = productFormControls["rate"].value;
    const quantity = productFormControls["quantity"].value;
    let r = rate != "" && rate > 0 ? rate : 1;
    let q = quantity != "" && quantity > 0 ? quantity : 1;
    this.price = r * q;
  }

  gstCalculation() {
    let gstFormControls = this.getGSTFormControls;
    const stategst = gstFormControls["sgst"].value;
    const centralgst = gstFormControls["cgst"].value;
    let sgst = this.amount * (stategst / 100);
    let cgst = this.amount * (centralgst / 100);
    this.amount = parseFloat((this.amount + sgst + cgst).toFixed(2));
  }

  printOnly(){
    window.print();
  }
}
