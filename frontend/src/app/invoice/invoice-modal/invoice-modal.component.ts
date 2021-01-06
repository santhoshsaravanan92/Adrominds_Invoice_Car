import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvoiceServiceService } from "../services/invoice-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BaseComponent } from "src/app/components/base/base.component";
import { Constants } from "src/app/helpers/constant";
import {
  InvoiceInformation,
  ProductInformation,
} from "../models/invoice-models";
import {
  getLoggedInUserEmail,
  getDateddmmyyyyformat,
} from "src/app/helpers/utilities";

@Component({
  selector: "app-invoice-modal",
  templateUrl: "./invoice-modal.component.html",
  styleUrls: ["./invoice-modal.component.sass"],
})
export class InvoiceModalComponent extends BaseComponent implements OnInit {
  private _id: string = "";
  private _modalDataToPass: any;
  CustomerForm: FormGroup;
  productForm: FormGroup;
  gstForm: FormGroup;
  amount: number = 0;
  price: number = 0;
  amountwithdiscount: number = 0;
  paymentMode: any = ["Amount", "Credit Card", "EMI", "Check"];
  discounts: any = ["%", "nos"];
  customerNames: string[] = [];
  gridDatas: ProductInformation[] = [];
  invoiceFormSubmitted: boolean = false;
  addItemFormsSubmitted: boolean = false;
  isLoadingDone: boolean = false;
  private dated = "";
  @Input("modalDataToPass")
  set modalDataToPass(value: any) {
    if (value) {
      this._modalDataToPass = value;
      this._id = this._modalDataToPass.id;
      //this.resetValues();
      if (this._id != "") this.getInvoiceRecordById(this._id);
    }
  }

  @Output("emitData")
  emitData = new EventEmitter<string>();
  constructor(
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    private invoiceService: InvoiceServiceService
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
      vehiclenumber: ["", [Validators.required]],
      othernotes: [""],
      templatename: ["Default Template"],
      mode: ["", [Validators.required]],
      dated: [new Date()],
      model: [""],
      km: ["0"],
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
      amountwithgst: ["0"],
      discount: ["0"],
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
    productModelObj.Description = description;
    productModelObj.Price = price;
    productModelObj.Quantity = quantity;
    productModelObj.Rate = rate;
    this.amount += price;
    this.gstCalculation();
    this.gridDatas.push(productModelObj);
    this.productForm.reset();
    this.addItemFormsSubmitted = false;
  }

  calculateProductPrice() {
    let productFormControls = this.getProductFormControls;
    const rate = productFormControls["rate"].value;
    const quantity = productFormControls["quantity"].value;
    if (rate && quantity) {
      let r = rate != "" && rate > 0 ? rate : 1;
      let q = quantity != "" && quantity > 0 ? quantity : 1;
      this.price = r * q;
      if (localStorage.getItem("price") != null) {
        const _price = parseInt(localStorage.getItem("price"));
        localStorage.setItem("price", (this.price + _price).toString());
      } else localStorage.setItem("price", "" + this.price);
    }
  }

  gstCalculation() {
    let gstFormControls = this.getGSTFormControls;
    let stategst = gstFormControls["sgst"].value;
    let centralgst = gstFormControls["cgst"].value;
    const discount = gstFormControls["discount"].value;
    const discountOptionvalue = this.getChangeDiscount.value;
    const discountOption =
      discountOptionvalue != "" && discountOptionvalue != null
        ? discountOptionvalue.split(" ")[1]
        : "";
    const totalpricewithoutgst = parseInt(localStorage.getItem("price"));

    if (!stategst) stategst = 8;
    // if (!centralgst) centralgst = 8;

    const gst = (totalpricewithoutgst * stategst) / 100;
    //const cgst = (totalpricewithoutgst * centralgst) / 100;

    this.amount = this.amountwithdiscount = parseFloat(
      (totalpricewithoutgst + gst).toFixed(2)
    );

    if (discount > 0 && discountOption != "") {
      if (discountOption != "%") {
        this.amountwithdiscount = parseFloat(
          (this.amountwithdiscount - discount).toFixed(2)
        );
      } else {
        let amountToReduce = this.amount * (discount / 100);
        this.amountwithdiscount = parseFloat(
          (this.amount - amountToReduce).toFixed(2)
        );
      }
    }
  }

  get getChangeDiscount() {
    return this.gstForm.get("discountoption");
  }

  changeDiscount(e) {
    this.gstForm.get("discountoption").setValue(e.target.value, {
      onlySelf: true,
    });
    this.gstCalculation();
  }

  changePaymentMode(e) {
    this.CustomerForm.get("mode").setValue(e.target.value, {
      onlySelf: true,
    });
  }

  getInvoiceRecordById(id: string) {
    if (id != "") {
      this.invoiceService.getInvoiceById(id).subscribe((invoiceRecord) => {
        const gstFormControls = this.getGSTFormControls;
        gstFormControls["sgst"].setValue(invoiceRecord.sgst);
        gstFormControls["cgst"].setValue(invoiceRecord.csgt);
        gstFormControls["amountwithgst"].setValue(invoiceRecord.amount);
        gstFormControls["discount"].setValue(invoiceRecord.discount);
        gstFormControls["discountoption"].setValue(
          invoiceRecord.discount_option
        );
        gstFormControls["amount"].setValue(invoiceRecord.amountwithdiscount);

        const customerFormControls = this.getCustomerFormControls;
        customerFormControls["customername"].setValue(invoiceRecord.Name);
        customerFormControls["deliverynotes"].setValue(
          invoiceRecord.DeliveryNotes
        );
        customerFormControls["ordernumber"].setValue(
          invoiceRecord.BuyerOrderNumber
        );
        customerFormControls["vehiclenumber"].setValue(
          invoiceRecord.VehicleNumber
        );
        customerFormControls["othernotes"].setValue(invoiceRecord.otherNotes);
        customerFormControls["templatename"].setValue("Default Template");
        customerFormControls["mode"].setValue(invoiceRecord.mode);
        this.dated = getDateddmmyyyyformat(invoiceRecord.Dated);
        customerFormControls["dated"].setValue(this.dated);
        customerFormControls["model"].setValue(invoiceRecord.model);
        customerFormControls["km"].setValue(invoiceRecord.km);
        localStorage.setItem("idToUpdate", id);
      }),
        (err) => {};
      // send request to get the invoice product details
      this.invoiceService
        .getInvoiceProductById(id)
        .subscribe((invoiceProductRecord) => {
          this.gridDatas = invoiceProductRecord;
          let total = 0;
          invoiceProductRecord.map((a) => {
            total += parseInt(a.Price);
          });
          localStorage.setItem("price", total.toString());
        });
    } else {
      this.resetValues();
      //this.submitted = false;
      this.emitData.emit("closemodal");
    }
  }

  search(event) {
    this.invoiceService.getCustomerNames(event.query).subscribe((data) => {
      this.customerNames = data;
    });
  }

  resetValues() {
    this.gridDatas = [];
    this.amount = 0;
    this.price = 0;
    this.gstForm.reset();
    this.CustomerForm.reset();
    this.productForm.reset();
  }

  closeModal() {
    this.resetValues();
    this.emitData.emit("closemodal");
  }

  get getPaymentMode() {
    return this.CustomerForm.get("mode");
  }

  update() {
    const gstFormControls = this.getGSTFormControls;
    let invoiceObj = new InvoiceInformation();
    const stategst = gstFormControls["sgst"].value;
    const centralgst = gstFormControls["cgst"].value;
    invoiceObj.sgst = stategst != "" && stategst != null ? stategst : 8;
    invoiceObj.cgst = centralgst != "" && centralgst != null ? centralgst : 8;
    invoiceObj.amount = this.amount;
    invoiceObj.amountwithdiscount = this.amountwithdiscount;
    invoiceObj.discount = gstFormControls["discount"].value;
    invoiceObj.discount_option = this.getChangeDiscount.value.split(" ")[1];

    const customerFormControls = this.getCustomerFormControls;
    invoiceObj.invoiceid = localStorage.getItem("idToUpdate");

    invoiceObj.Dated =
      this.dated == customerFormControls["dated"].value
        ? customerFormControls["dated"].value
        : customerFormControls["dated"].value.toLocaleDateString();
    invoiceObj.BuyerOrderNumber = customerFormControls["ordernumber"].value;
    invoiceObj.DeliveryNotes = customerFormControls["deliverynotes"].value;
    invoiceObj.Email = getLoggedInUserEmail();
    invoiceObj.name = customerFormControls["customername"].value;
    invoiceObj.VehicleNumber = customerFormControls["vehiclenumber"].value;
    invoiceObj.km = customerFormControls["km"].value;
    invoiceObj.mode = this.getPaymentMode.value.split(" ")[1];
    invoiceObj.model = customerFormControls["model"].value;
    invoiceObj.otherNotes = customerFormControls["othernotes"].value;

    this.invoiceService.updateInvoice(invoiceObj).subscribe((data) => {
      if (data.message === "invoice updated") {
        let data = [];
        this.gridDatas.map((d) => {
          data.push({ ...d, Invoice_Number: invoiceObj.invoiceid });
        });

        // another service call
        this.invoiceService.updateInvoiceProducts(data).subscribe((data) => {
          if (data.message === "invoice product updated") {
            this.resetValues();
            this.emitData.emit("updated");
            localStorage.setItem("price", "0");
          } else {
            this.resetValues();
            this.emitData.emit("error");
          }
        }),
          (err) => {
            console.log(err);
          };
      } else {
        this.resetValues();
        this.emitData.emit("updated");
      }
    }),
      (err) => {
        console.log(err);
      };
  }
}
