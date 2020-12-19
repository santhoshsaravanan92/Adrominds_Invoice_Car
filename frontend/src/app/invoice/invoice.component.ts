import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../components/base/base.component";
import { MessageService } from "primeng/api";
import { Constants } from "../helpers/constant";
import {
  ProductInformation,
  InvoiceInformation,
} from "./models/invoice-models";
import { getLoggedInUserEmail } from "../helpers/utilities";
import { InvoiceServiceService } from "./services/invoice-service.service";

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
  amountwithdiscount: number = 0;
  paymentMode: any = ["Amount", "Credit Card", "EMI", "Check"];
  discounts: any = ["%", "nos"];
  customerNames: string[] = [];

  testHTMLContent: string =
    '<html><head><style>md-dialog-actions{display: none;}.invoice-box {max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;line-height: 24px;color: #555;}.invoice-box table {width: 100%;line-height: inherit;text-align: left;}.invoice-box table td {padding: 5px;vertical-align: top;}.invoice-box table tr td:nth-child(2) {text-align: right}.invoice-box table tr.top table td {padding-bottom: 20px}.invoice-box table tr.top table td.title {font-size: 45px;line-height: 45px;color: #333}.invoice-box table tr.information table td {padding-bottom: 40px;}.invoice-box table tr.heading td {background: #eee;border-bottom: 1px solid #ddd;font-weight: 700;}.invoice-box table tr.details td {padding-bottom: 20px}.invoice-box table tr.item td {border-bottom: 1px solid #eee;}.invoice-box table tr.item.last td {border-bottom: none;}.invoice-box table tr.total td:nth-child(2) {border-top: 2px solid #eee;font-weight: 700;}</style></head><body><div class="invoice-box"><table cellpadding="0" cellspacing="0"><tr class="top"><td colspan="2"><table><tr><td>Invoice #: 123<br>Created: {today}<br></td></tr></table></td></tr><tr class="information"><td colspan="2"><table><tr><td>Service center Address 1<br>no 1<br>Test Address<br>center email</td><td>{name}<br>{model}<br>{km}<br>{mode}</td></tr></table></td></tr><tr class="heading"><td>Delivery Notes</td></tr><tr class="details"><td>{notes}</td></tr><tr class="heading"><td>Items</td><td>Each Price</td><td>Quantity</td><td>Amount</td></tr>{bodycontent}<tr class="total"><td></td><td></td><td></td><td>State GST: {sgst}</td></tr><tr class="total"><td></td><td></td><td></td><td>Central GST: {cgst}</td></tr><tr class="total"><td></td><td></td><td></td><td>Total: {amount}</td></tr></table></div></body></html>';

  constructor(
    private formBuilder: FormBuilder,
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
      dated: [new Date().toLocaleDateString("en-GB")],
      model: [""],
      km: [""],
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

  openCustomerpage() {
    this.loadCustomerPage = true;
  }

  calculateProductPrice() {
    let productFormControls = this.getProductFormControls;
    const rate = productFormControls["rate"].value;
    const quantity = productFormControls["quantity"].value;
    let r = rate != "" && rate > 0 ? rate : 1;
    let q = quantity != "" && quantity > 0 ? quantity : 1;
    this.price = r * q;
    localStorage.setItem("price", "" + this.price);
  }

  gstCalculation() {
    let gstFormControls = this.getGSTFormControls;
    const stategst = gstFormControls["sgst"].value;
    const centralgst = gstFormControls["cgst"].value;
    const discount = gstFormControls["discount"].value;
    const discountOptionvalue = this.getChangeDiscount.value;
    const discountOption = discountOptionvalue.split(" ")[1];
    const totalpricewithoutgst = parseInt(localStorage.getItem("price"));
    let sgst = totalpricewithoutgst * (stategst / 100);
    let cgst = totalpricewithoutgst * (centralgst / 100);

    this.amount = this.amountwithdiscount = parseFloat(
      (totalpricewithoutgst + sgst + cgst).toFixed(2)
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

  saveAndPrint() {
    this.saveOnly();
    this.printOnly();
  }

  prepareBodyContentForPrint() {
    let content = "";
    this.gridDatas.map((a) => {
      content +=
        '<tr class="item"><td>' +
        a.Description +
        "</td><td>" +
        a.Rate +
        "</td><td>" +
        a.Quantity +
        "</td><td>" +
        a.Price +
        "</td></tr>";
    });
    return content;
  }

  printOnly() {
    if (this.validateForms()) {
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      let bodyContent = this.prepareBodyContentForPrint();
      let htmlContent = this.testHTMLContent.replace(
        "{today}",
        new Date().toLocaleDateString("en-US")
      );
      let actualcontent = htmlContent.replace(
        "{amount}",
        this.amount.toString()
      );
      let a = actualcontent.replace("{bodycontent}", bodyContent);

      let controls = this.getCustomerFormControls;
      const customerName = controls["customername"].value;
      let namereplaced = a.replace("{name}", customerName);
      let modelreplaced = namereplaced.replace(
        "{model}",
        controls["model"].value
      );
      let kmreplaced = modelreplaced.replace("{km}", controls["km"].value);
      let modereplaced = kmreplaced.replace("{mode}", controls["mode"].value);
      let notes = modereplaced.replace(
        "{notes}",
        controls["deliverynotes"].value
      );

      const gstFormControls = this.getGSTFormControls;
      let b = notes.replace("{sgst}", gstFormControls["sgst"].value);
      let printContent = b.replace("{cgst}", gstFormControls["cgst"].value);

      WinPrint.document.write(printContent);
      WinPrint.document.close();
      WinPrint.setTimeout(function () {
        WinPrint.focus();
        WinPrint.document.title = `${customerName}_${new Date().toLocaleDateString(
          "en-US"
        )}`;
        WinPrint.print();
        WinPrint.close();
      }, 1000);
    }
  }

  saveOnly() {
    if (this.validateForms()) {
      if (this.gridDatas.length == 0) {
        this.updateToastMessage(
          "Atleast one product must add to grid",
          Constants.error,
          "AdroMinds Invoice"
        );
        this.addItemFormsSubmitted = false;
        return;
      }
      this.prepareEntireInvoiceFormData();
    }
  }

  validateForms() {
    if (this.gstForm.invalid || this.CustomerForm.invalid) {
      this.updateToastMessage(
        "All fields are mandatory in Product information",
        Constants.error,
        "AdroMinds Invoice"
      );
      this.addItemFormsSubmitted = false;
      return false;
    }
    return true;
  }

  prepareEntireInvoiceFormData() {
    const gstFormControls = this.getGSTFormControls;
    let invoiceObj = new InvoiceInformation();
    invoiceObj.sgst = gstFormControls["sgst"].value;
    invoiceObj.cgst = gstFormControls["cgst"].value;
    invoiceObj.amount = this.amount;
    invoiceObj.amountwithdiscount = this.amountwithdiscount;
    invoiceObj.discount = gstFormControls["discount"].value;
    invoiceObj.discount_option = this.getChangeDiscount.value.split(' ')[1];

    const customerFormControls = this.getCustomerFormControls;
    let date = new Date().toLocaleDateString("en-US").replace("/", "");
    const date1 = date.replace("/", "");
    let o = new Date();
    invoiceObj.InvoiceId =
      date1 + o.getHours() + o.getMinutes() + o.getSeconds();
    invoiceObj.Dated = customerFormControls["dated"].value;
    invoiceObj.BuyerOrderNumber = customerFormControls["ordernumber"].value;
    invoiceObj.DeliveryNotes = customerFormControls["deliverynotes"].value;
    invoiceObj.Email = getLoggedInUserEmail();
    invoiceObj.Name = customerFormControls["customername"].value;
    invoiceObj.VehicleNumber = customerFormControls["vehiclenumber"].value;
    invoiceObj.km = customerFormControls["km"].value;
    invoiceObj.mode = this.getPaymentMode.value.split(' ')[1];
    invoiceObj.model = customerFormControls["model"].value;
    invoiceObj.otherNotes = customerFormControls["othernotes"].value;

    this.invoiceService.addInvoice(invoiceObj).subscribe((data) => {
      if (data.message === "invoice added") {
        let data = [];
        this.gridDatas.map((d) => {
          data.push({ ...d, Invoice_Number: invoiceObj.InvoiceId });
        });

        // another service call
        this.invoiceService.addInvoiceProducts(data).subscribe((data) => {
          if (data.message === "invoice product added") {
            this.updateToastMessage(
              "Invoice created.",
              Constants.success,
              "Invoice"
            );
            this.resetValues();
          } else {
            this.updateToastMessage(
              "Invoice not created. Try again later.",
              Constants.error,
              "Invoice"
            );
          }
        }),
          (err) => {
            console.log(err);
          };
      } else {
        this.updateToastMessage(
          "Invoice not created. Try again later.",
          Constants.error,
          "Invoice"
        );
      }
    }),
      (err) => {
        console.log(err);
      };
  }

  get getPaymentMode() {
    return this.CustomerForm.get("mode");
  }

  changePaymentMode(e) {
    this.CustomerForm.get("mode").setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get getChangeDiscount() {
    return this.gstForm.get("discountoption");
  }

  changeDiscount(e) {
    this.gstForm.get("discountoption").setValue(e.target.value, {
      onlySelf: true,
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

  search(event) {
    this.invoiceService.getCustomerNames(event.query).subscribe((data) => {
      data.map((a) => {
        this.customerNames.push(a.Name);
      });
    });
  }
}
