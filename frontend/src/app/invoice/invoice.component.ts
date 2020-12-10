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
  invoiceFormSubmitted: boolean = false;
  addItemFormsSubmitted: boolean = false;
  isLoadingDone: boolean = false;
  loadCustomerPage: boolean = false;
  gridDatas: ProductInformation[] = [];
  total:number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.CustomerFormCreation();
    this.productFormCreation();
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
      sgst: [""],
      cgst: [""],
      discount: [""],
      amount: [""],
    });
  }

  get getCustomerFormControls() {
    return this.CustomerForm.controls;
  }

  get getProductFormControls() {
    return this.productForm.controls;
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

    this.total = price * quantity;

    this.gridDatas.push(productModelObj);
    this.productForm.reset();
    this.addItemFormsSubmitted = false;
  }

  openCustomerpage() {
    this.loadCustomerPage = true;
  }

  CustomerFormSubmit() {}
}
