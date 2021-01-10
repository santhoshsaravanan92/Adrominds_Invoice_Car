import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { Constants } from "../helpers/constant";
import { getLoggedInUserEmail } from "../helpers/utilities";
import { InvoiceServiceService } from "../invoice/services/invoice-service.service";
import { CustomerInformation } from "./models/customer-model";
import { CustomerServiceService } from "./services/customer-service.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.sass"],
})
export class CustomerComponent implements OnInit {
  loadAddEditModal: boolean = false;
  gridDatas: CustomerInformation[] = [];
  isLoadingDone: boolean = false;
  modalDataToPass: any;
  customerNames: string[] = [];
  customerFilterForm: FormGroup;

  constructor(
    public messageService: MessageService,
    private customerService: CustomerServiceService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceServiceService
  ) {}

  ngOnInit(): void {
    this.customerFilterFormCreation();
    this.getAllCustomers();
  }

  customerFilterFormCreation() {
    this.customerFilterForm = this.formBuilder.group({
      customername: [""],
      mobilenumber: [""],
    });
  }

  openDialog() {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      id: "",
      isEdit: false,
    };
  }

  updateToastMessage(msg, severity, title) {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: msg,
    });
  }

  handleEmittedData($event) {
    if ($event == "closemodal") this.loadAddEditModal = false;
    else if ($event === "customer added") {
      this.updateToastMessage(
        "Customer Added successfully",
        Constants.success,
        "Customer Information"
      );
      this.getAllCustomers();
    } else if ($event === "customer update") {
      this.getAllCustomers();
      this.updateToastMessage(
        "Customer details updated",
        Constants.success,
        "Customer Information"
      );
    } else if ($event === "check form data") {
      this.updateToastMessage(
        "Form data is not valid. kindly check the filled details.",
        Constants.error,
        "Customer Information"
      );
    } else if ($event === "customer exists") {
      this.updateToastMessage(
        "Customer Already exists in system.",
        Constants.error,
        "Customer Information"
      );
    } else if ($event === "error") {
      this.updateToastMessage(
        "Something went wrong. Please try again later.",
        Constants.error,
        "Customer Information"
      );
    }
  }

  getAllCustomers() {
    this.isLoadingDone = true;
    this.customerService
      .getAllCustomer(getLoggedInUserEmail())
      .subscribe((data) => {
        if (data.length > 0) {
          let datas = [];
          data.forEach((e) => {
            let a = new CustomerInformation();
            a.Address = e.Address;
            a.Comments = e.Comments;
            a.Email = e.Email;
            a.GST = e.GST;
            a.Mobile = e.Mobile;
            a.Name = e.Name;
            datas.push(a);
          });
          this.gridDatas = data;
        }

        this.isLoadingDone = false;
      }),
      (err) => {
        console.log(err);
      };
  }

  deleteCustomer(id: string, name: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the customer ${name}`,
      header: "Delete Customer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (id !== "") {
          this.customerService.deleteCustomer(id).subscribe((res) => {
            if (res.message === "customer deleted") {
              this.getAllCustomers();
              this.updateToastMessage(
                "Customer Information Deleted Successfully",
                Constants.success,
                "Customer Information"
              );
            }
          });
        }
      },
      reject: () => {},
    });
  }

  editCustomer(id: string) {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      id: id,
      isEdit: true,
    };
  }

  search(event) {
    this.invoiceService.getCustomerNames(event.query).subscribe((data) => {
      this.customerNames = data;
    });
  }

  applyFilter(formDate) {
    this.isLoadingDone = true;
    if (formDate.mobilenumber.length > 0 && formDate.mobilenumber.length < 10) {
      this.updateToastMessage(
        "Mobile number should be 10 digits",
        Constants.error,
        "Customer Information"
      );
      this.isLoadingDone = false;
      return;
    }
    if (formDate.mobilenumber == "") formDate.mobilenumber = 0;
    this.customerService
      .getCustomerDetailsForFilter(
        formDate.customername.Name,
        formDate.mobilenumber
      )
      .subscribe((data) => {
        this.isLoadingDone = true;
        if (data.length > 0) {
          let datas = [];
          data.forEach((e) => {
            let a = new CustomerInformation();
            a.Address = e.Address;
            a.Comments = e.Comments;
            a.Email = e.Email;
            a.GST = e.GST;
            a.Mobile = e.Mobile;
            a.Name = e.Name;
            datas.push(a);
          });
          this.gridDatas = data;
          this.isLoadingDone = false;
        } else {
          this.updateToastMessage(
            "No data for the filter 😔",
            Constants.error,
            "Expense information"
          );
        }
        this.isLoadingDone = false;
      }),
      (err) => {
        console.log(err);
      };
  }

  clearform() {
    this.customerFilterForm.reset();
    this.getAllCustomers();
  }
}
