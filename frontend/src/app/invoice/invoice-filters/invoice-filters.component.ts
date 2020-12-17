import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BaseComponent } from "src/app/components/base/base.component";
import { Constants } from "src/app/helpers/constant";
import { InvoiceServiceService } from "../services/invoice-service.service";
import { InvoicFilter } from "../models/invoic-filter.model";
import { InvoiceInformation } from "../models/invoice-models";
import * as XLSX from "xlsx";

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
      data.map((a) => {
        this.customerNames.push(a.Name);
      });
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
    this.prepareDateToExport();
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice Report");
    XLSX.writeFile(
      wb,
      `Invoice_Reports_${new Date().toLocaleDateString("en-GB")}.xlsx`
    );
  }

  exportPDF() {
    if (!this.validateFormFields()) {
      this.updateToastMessage(
        "From date is mandatory to generate report.",
        Constants.error,
        "AdroMinds Invoice"
      );
      return;
    }
    this.prepareDateToExport();
  }

  prepareDateToExport() {
    debugger;
    const controls = this.getReportFormControls;
    let fileterObj = new InvoicFilter();
    fileterObj.Name = controls["customername"].value;
    fileterObj.FromDate = controls["fromdate"].value;
    fileterObj.ToDate = controls["todate"].value;
    fileterObj.VehicleNumber = controls["vehiclenumber"].value;
    fileterObj.Model = controls["model"].value;

    this.invoiceService.getDateForReports(fileterObj).subscribe((result) => {
      if (result.length > 0) {
        console.log(result)
        this.invoices = result;
      }
    });
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
