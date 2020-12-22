import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BaseComponent } from "src/app/components/base/base.component";
import { Constants } from "src/app/helpers/constant";
import { InvoiceServiceService } from "../services/invoice-service.service";
import { InvoicFilter } from "../models/invoic-filter.model";
import { InvoiceInformation } from "../models/invoice-models";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

@Component({
  selector: "app-invoice-filters",
  templateUrl: "./invoice-filters.component.html",
  styleUrls: ["./invoice-filters.component.sass"],
})
export class InvoiceFiltersComponent extends BaseComponent implements OnInit {
  reportForm: FormGroup;
  isProfileLoadDone: boolean = true;
  customerNames: string[] = [];
  invoices: InvoiceInformation[] = [];
  @ViewChild("htmlData") htmlData: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private invoiceService: InvoiceServiceService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.reportFormCreation();
  }

  reportFormCreation() {
    this.reportForm = this.formBuilder.group({
      customername: [""],
      fromdate: [""],
      todate: [""],
      vehiclenumber: [""],
      model: [""],
    });
  }

  get getReportFormControls() {
    return this.reportForm.controls;
  }

  search(event) {
    this.invoiceService.getCustomerNames(event.query).subscribe((data) => {
      this.customerNames = data;
    });
  }

  clearForm() {
    this.reportForm.reset();
  }

  exportExcel() {
    if (!this.validateFormFields()) {
      this.updateToastMessage(
        "From date is mandatory to generate report.",
        Constants.error,
        "AdroMinds Invoice"
      );
      return;
    }
    if (this.prepareDateToExport()) {
      let element = document.getElementById("excel-table");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Invoice Report");
      XLSX.writeFile(
        wb,
        `Invoice_Reports_${new Date().toLocaleDateString("en-GB")}.xlsx`
      );
    } else {
      this.updateToastMessage(
        "No data to export.",
        Constants.error,
        "AdroMinds Invoice"
      );
    }
  }

  exportPDF() {
    this.isProfileLoadDone = false;
    if (!this.validateFormFields()) {
      this.updateToastMessage(
        "From date is mandatory to generate report.",
        Constants.error,
        "AdroMinds Invoice"
      );
      return;
    }
    if (this.prepareDateToExport()) {
      setTimeout(() => {
        if (this.invoices.length > 0) {
          // let DATA = document.getElementById("excel-table");

          // doc.html(DATA.innerHTML, {
          //   callback: (doc) => {
          //     doc.save(
          //       `Invoice_Reports_${new Date().toLocaleDateString("en-GB")}.pdf`
          //     );
          //   },
          //   x: 10,
          //   y: 10,
          // });

          // let a = ["a", "b"];
          let data = this.htmlData.nativeElement;
          let doc = new jsPDF("p", "pt", "a4");
          let handleElement = {
            "#editor": function (element, renderer) {
              return true;
            },
          };
          debugger;
          doc.html(document.getElementById("excel-table").innerHTML, {
            callback: (doc) => {
              doc.save(
                `Invoice_Reports_${new Date().toLocaleDateString("en-GB")}.pdf`
              );
            },
            x: 10,
            y: 10,
          });
          //doc.save(
          //   `Invoice_Reports_${new Date().toLocaleDateString("en-GB")}.pdf`
          // );
        } else {
          this.updateToastMessage(
            "No Records to Form PDF.",
            Constants.error,
            "AdroMinds Invoice"
          );
        }
      }, 2000);
    } else {
      this.updateToastMessage(
        "No data to export.",
        Constants.error,
        "AdroMinds Invoice"
      );
    }
    this.isProfileLoadDone = true;
  }

  prepareDateToExport() {
    const controls = this.getReportFormControls;
    let fileterObj = new InvoicFilter();
    fileterObj.Name = controls["customername"].value;
    fileterObj.FromDate = controls["fromdate"].value;
    fileterObj.ToDate = controls["todate"].value;
    fileterObj.VehicleNumber = controls["vehiclenumber"].value;
    fileterObj.Model = controls["model"].value;

    this.invoiceService.getDateForReports(fileterObj).subscribe((result) => {
      if (result.length > 0) {
        this.invoices = result;
      } else return false;
    });
    return true;
  }

  validateFormFields() {
    const controls = this.getReportFormControls;
    const fromDate = controls["fromdate"].value;
    if (fromDate == "") {
      return false;
    }

    return true;
  }
}
