import { Component, OnInit } from "@angular/core";
import { InvoiceInformation } from "../models/invoice-models";
import { getLoggedInUserEmail } from "../../helpers/utilities";
import { InvoiceServiceService } from "../services/invoice-service.service";
import { BaseComponent } from "../../components/base/base.component";
import { Constants } from "../../helpers/constant";
import { MessageService, ConfirmationService } from "primeng/api";

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

  constructor(
    private invoiceService: InvoiceServiceService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService
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
            a.InvoiceId = e.InvoiceId;
            a.Name = e.Name;
            a.VehicleNumber = e.VehicleNumber;
            a.model = e.model;
            a.mode = e.mode;
            a.amount = e.amount;
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
    if ($event == "closemodal")
     this.loadAddEditModal = false;
  }
}
