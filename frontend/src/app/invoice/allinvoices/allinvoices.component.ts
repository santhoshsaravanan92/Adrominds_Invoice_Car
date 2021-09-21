import { Component, Input, OnInit } from "@angular/core";
import { InvoiceInformation } from "../models/invoice-models";
import {
  getLoggedInUserEmail,
  getTodayDate,
  print,
} from "../../helpers/utilities";
import { InvoiceServiceService } from "../services/invoice-service.service";
import { BaseComponent } from "../../components/base/base.component";
import { Constants } from "../../helpers/constant";
import { MessageService, ConfirmationService } from "primeng/api";
import { ProfileService } from "src/app/services/profile.service";
import { CustomerServiceService } from "src/app/customer/services/customer-service.service";

@Component({
  selector: "app-allinvoices",
  templateUrl: "./allinvoices.component.html",
  styleUrls: ["./allinvoices.component.sass"],
})
export class AllinvoicesComponent extends BaseComponent implements OnInit {
  gridDatas: InvoiceInformation[] = [];
  isLoadingDone: boolean = false;
  modalDataToPass: any;
  loadAddEditModal = false;
  private _dataForGridOnExport: any;
  @Input("dataForGridOnExport")
  set dataForGridOnExport(value: any) {
    debugger;
    if (value.length > 0) {
      this.gridDatas = value;
    } else {
      this.getAllInvoices();
    }
  }

  @Input("_isTabChanged")
  set _isTabChanged(value: any) {
    if (value) {
      this.getAllInvoices();
    }
  }

  constructor(
    private invoiceService: InvoiceServiceService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private profileSerive: ProfileService,
    private customerService: CustomerServiceService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.isLoadingDone = true;
    this.invoiceService
      .getAllInvoices(getLoggedInUserEmail())
      .subscribe((data) => {
        if (data.length > 0) {
          this.gridDatas = [];
          data.forEach((e) => {
            let a = new InvoiceInformation();
            a.invoiceid = e.InvoiceId;
            a.name = e.Name;
            a.VehicleNumber = e.VehicleNumber;
            a.model = e.model;
            a.mode = e.mode;
            a.amount = e.amount;
            a.Dated = e.Dated;
            this.gridDatas.push(a);
          });
        }
        this.isLoadingDone = false;
      }),
      (err) => {
        console.log(err);
      };
  }

  editInvoice(invoiceId) {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      id: invoiceId,
    };
  }

  deleteInvoice(invoiceId, name) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the Invoice for the customer ${name}`,
      header: "Delete Invoice",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (invoiceId !== "") {
          this.invoiceService.deleteInvoice(invoiceId).subscribe((res) => {
            if (res.message === "deleted") {
              this.getAllInvoices();
              this.updateToastMessage(
                "Invoice Information Deleted Successfully",
                Constants.success,
                "Invoice Information"
              );
            }
          });
        }
      },
      reject: () => {},
    });
  }

  handleEmittedData($event) {
    if ($event == "closemodal") this.loadAddEditModal = false;
    else if ($event == "updated") {
      this.loadAddEditModal = false;
      this.getAllInvoices();
      this.updateToastMessage("Invoice updated.", Constants.success, "Invoice");
    } else {
      this.updateToastMessage(
        "Something went wrong. Try again later.",
        Constants.error,
        "Invoice"
      );
    }
  }

  clearGrid() {
    this.getAllInvoices();
  }

  printInvoice(invoiceId) {
    let bodyContent = "";
    this.invoiceService.getInvoiceById(invoiceId).subscribe((invoiceRecord) => {
      let htmlContent = Constants.printTemplate.replace(
        "{today}",
        getTodayDate()
      );
      let actualcontent = htmlContent.replace(
        "{amount}",
        invoiceRecord.amountwithdiscount.toString()
      );

      let namereplaced = actualcontent.replace("{name}", invoiceRecord.Name);
      let modelreplaced = namereplaced.replace("{model}", invoiceRecord.model);
      let kmreplaced = modelreplaced.replace(
        "{vn}",
        invoiceRecord.VehicleNumber
      );
      let modereplaced = kmreplaced.replace("{mode}", invoiceRecord.mode);
      let notes = modereplaced.replace("{notes}", invoiceRecord.DeliveryNotes);

      let b = notes.replace("{sgst}", invoiceRecord.sgst);
      const a = b.replace("{cgst}", invoiceRecord.csgt);
      const invoiceIDUpdate = a.replace("{invoiceid}", invoiceId);
      const on = invoiceIDUpdate.replace(
        "{othernote}",
        invoiceRecord.otherNotes
      );
      const buyerno = on.replace(
        "{buyerorder}",
        invoiceRecord.BuyerOrderNumber
      );
      const discount = buyerno.replace("{discount}", invoiceRecord.discount);
      const amountwithoutdiscount = discount.replace(
        "{amountwithoutdiscount}",
        invoiceRecord.amount
      );

      // send request to get the invoice product details
      this.invoiceService
        .getInvoiceProductById(invoiceId)
        .subscribe((invoiceProductRecord) => {
          invoiceProductRecord.map((a) => {
            bodyContent +=
              '<tr class="all-border"><td>' +
              a.Description +
              "</td><td>" +
              a.Rate +
              "</td><td>" +
              a.Quantity +
              "</td><td>" +
              a.Price +
              "</td></tr>";
          });
          const bodyupdated = amountwithoutdiscount.replace(
            "{bodycontent}",
            bodyContent
          );

          this.profileSerive
            .getProfileInformation(getLoggedInUserEmail())
            .subscribe((result) => {
              const c = (bodyupdated as any).replaceAll(
                "{companyname}",
                result.data.Company
              );
              const ca = c.replace(
                "{companyaddress}",
                `${result.data.Name} <br>${result.data.Address}<br>email: ${result.data.Email}<br>phone: ${result.data.Mobile}/${result.data.Landline}<br>GST:${result.data.GST}<br>${result.data.Website}`
              );
              const bankname = ca.replace("{bankname}", result.data.Bankname);
              const acc = bankname.replace(
                "{accno}",
                result.data.AccountNumber
              );
              const ifsc = acc.replace(
                "{branch}",
                `${result.data.Branchname} & ${result.data.Ifsc}`
              );
              const km = ifsc.replace("{km}", invoiceRecord.km);

              // service call to get customer information
              this.customerService
                .getCustomerByName(invoiceRecord.Name)
                .subscribe((result) => {
                  console.log(result);
                  const printContent = km.replace(
                    "{customeraddress}",
                    `${result.Address}<br>Phone: ${result.Mobile} <br> Email: ${result.Email}`
                  );
                  print(printContent, invoiceRecord.Name);
                });
            }),
            (err) => {
              console.log(err);
            };
        });
    }),
      (err) => {};
  }
}
