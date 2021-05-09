import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../components/base/base.component";
import { MessageService } from "primeng/api";
import { Constants } from "../helpers/constant";
import {
  ProductInformation,
  InvoiceInformation,
} from "./models/invoice-models";
import {
  getLoggedInUserEmail,
  getTodayDate,
  getTodayDateWithoutsplit,
  print,
} from "../helpers/utilities";
import { InvoiceServiceService } from "./services/invoice-service.service";
import { ProfileService } from "../services/profile.service";
import { CustomerServiceService } from "../customer/services/customer-service.service";
import { Router } from "@angular/router";

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
  isLoading: boolean = false;
  loadCustomerPage: boolean = false;
  gridDatas: ProductInformation[] = [];
  isTabChanged: boolean = false;
  amount: number = 0;
  price: number = 0;
  amountwithdiscount: number = 0;
  paymentMode: any = ["Amount", "Credit Card", "EMI", "Check"];
  discounts: any = ["%", "nos"];
  customerNames: string[] = [];

  constructor(
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    private invoiceService: InvoiceServiceService,
    private profileSerive: ProfileService,
    private customerService: CustomerServiceService,
    private router: Router
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

  saveAndPrint() {
    this.saveOnly();
    this.printOnly();
  }

  prepareBodyContentForPrint() {
    let content = "";
    this.gridDatas.map((a) => {
      content +=
        '<tr class="item"><td class="width">' +
        a.Description +
        '</td><td class="center">' +
        a.Rate +
        '</td><td  class="center">' +
        a.Quantity +
        '</td><td class="center">' +
        a.Price +
        "</td></tr>";
    });
    return content;
  }

  printOnly() {
    if (this.validateForms()) {
      let bodyContent = this.prepareBodyContentForPrint();
      let htmlContent = Constants.printTemplate.replace(
        "{today}",
        getTodayDate()
      );
      let actualcontent = htmlContent.replace(
        "{amount}",
        this.amount.toString()
      );
      let a = actualcontent.replace("{bodycontent}", bodyContent);

      let controls = this.getCustomerFormControls;
      const customerName = controls["customername"].value;
      let namereplaced = a.replace("{name}", customerName.Name);
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
      let gst = b.replace("{cgst}", gstFormControls["cgst"].value);

      this.profileSerive
        .getProfileInformation(getLoggedInUserEmail())
        .subscribe((result) => {
          const c = (gst as any).replaceAll(
            "{companyname}",
            result.data.Company
          );
          const ca = c.replace(
            "{companyaddress}",
            `${result.data.Name} <br>${result.data.Address}<br>email: ${result.data.Email}<br>phone: ${result.data.Mobile}/${result.data.Landline}<br>GST:${result.data.GST}<br>${result.data.Website}`
          );
          const bankname = ca.replace("{bankname}", result.data.Bankname);
          const acc = bankname.replace("{accno}", result.data.AccountNumber);
          const ifsc = acc.replace(
            "{branch}",
            `${result.data.Branchname} & ${result.data.Ifsc}`
          );
          const vn = ifsc.replace("{vn}", controls["vehiclenumber"].value);
          const buy = vn.replace("{buyerorder}", controls["ordernumber"].value);
          const othernotes = buy.replace(
            "{othernote}",
            controls["othernotes"].value
          );
          const amountwithgst = othernotes.replace(
            "{amountwithoutdiscount}",
            gstFormControls["amountwithgst"].value
          );
          let discountOptionvalue = this.getChangeDiscount.value;

          const discountOptionforprint = amountwithgst.replace(
            "{discount}",
            `${gstFormControls["discount"].value} ${
              discountOptionvalue != "" && discountOptionvalue != null
                ? discountOptionvalue.split(" ")[1]
                : "0"
            }`
          );
          // service call to get customer information
          this.customerService
            .getCustomerByName(customerName.Name)
            .subscribe((result) => {
              console.log(result);
              const printContent = discountOptionforprint.replace(
                "{customeraddress}",
                `${result.Address}<br>Phone: ${result.Mobile} <br> Email: ${result.Email}`
              );
              print(printContent, customerName.Name);
            });
        }),
        (err) => {
          console.log(err);
        };
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
    this.isLoading = true;
    const gstFormControls = this.getGSTFormControls;
    let invoiceObj = new InvoiceInformation();
    const stategst = gstFormControls["sgst"].value;
    const centralgst = gstFormControls["cgst"].value;
    invoiceObj.sgst = stategst != "" && stategst != null ? stategst : 8;
    invoiceObj.cgst = centralgst != "" && centralgst != null ? centralgst : 8;
    invoiceObj.amount = this.amount;
    invoiceObj.amountwithdiscount = this.amountwithdiscount;
    invoiceObj.discount = gstFormControls["discount"].value;
    let discountOptionvalue = this.getChangeDiscount.value;
    invoiceObj.discount_option =
      discountOptionvalue != "" && discountOptionvalue != null
        ? discountOptionvalue.split(" ")[1]
        : "";

    const customerFormControls = this.getCustomerFormControls;
    const o = new Date();
    invoiceObj.invoiceid =
      getTodayDateWithoutsplit() +
      o.getHours() +
      o.getMinutes() +
      o.getSeconds();
    invoiceObj.Dated = customerFormControls["dated"].value.toLocaleDateString();
    invoiceObj.BuyerOrderNumber = customerFormControls["ordernumber"].value;
    invoiceObj.DeliveryNotes = customerFormControls["deliverynotes"].value;
    invoiceObj.Email = getLoggedInUserEmail();
    invoiceObj.name = customerFormControls["customername"].value;
    invoiceObj.VehicleNumber = customerFormControls["vehiclenumber"].value;
    invoiceObj.km =
      customerFormControls["km"].value == null
        ? "0"
        : customerFormControls["km"].value;
    invoiceObj.mode = this.getPaymentMode.value.split(" ")[1];
    invoiceObj.model = customerFormControls["model"].value;
    invoiceObj.otherNotes = customerFormControls["othernotes"].value;

    this.invoiceService.addInvoice(invoiceObj).subscribe((data) => {
      if (data.message === "invoice added") {
        let data = [];
        this.gridDatas.map((d) => {
          data.push({ ...d, Invoice_Number: invoiceObj.invoiceid });
        });

        // another service call
        this.invoiceService.addInvoiceProducts(data).subscribe((data) => {
          if (data.message === "invoice product added") {
            localStorage.setItem("price", "0");
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
          this.isLoading = false;
          this.isTabChanged = true;
          // redirect to dashboard page.
          this.router.navigateByUrl("/dashboard");
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
    this.gstCalculation();
  }

  resetValues() {
    const gstFormControls = this.getGSTFormControls;
    gstFormControls["sgst"].setValue("8");
    gstFormControls["cgst"].setValue("8");
    gstFormControls["amountwithgst"].setValue("");
    gstFormControls["discount"].setValue("0");
    gstFormControls["discountoption"].setValue("");
    gstFormControls["amount"].setValue("");

    const customerFormControls = this.getCustomerFormControls;
    customerFormControls["customername"].setValue("");
    customerFormControls["deliverynotes"].setValue("");
    customerFormControls["ordernumber"].setValue("");
    customerFormControls["vehiclenumber"].setValue("");
    customerFormControls["othernotes"].setValue("");
    customerFormControls["templatename"].setValue("Default Template");
    customerFormControls["mode"].setValue("");
    customerFormControls["dated"].setValue(new Date());
    customerFormControls["model"].setValue("");
    customerFormControls["km"].setValue(0);

    this.gridDatas = [];
    this.amount = 0;
    this.price = 0;
  }

  search(event) {
    this.invoiceService.getCustomerNames(event.query).subscribe((data) => {
      this.customerNames = data;
    });
  }

  handleTabChange(e) {
    this.isTabChanged = true;
  }

  deleteInvoiceProd(prodDesc) {
    var i = this.gridDatas.findIndex((x) => x.Description === prodDesc);
    this.gridDatas.splice(i, 1);
  }
}
