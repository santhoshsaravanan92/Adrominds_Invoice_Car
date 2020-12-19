import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerInformation } from "../models/customer-model";
import { CustomerServiceService } from "../services/customer-service.service";
import { getLoggedInUserEmail } from "../../helpers/utilities";

@Component({
  selector: "app-customer-modal",
  templateUrl: "./customer-modal.component.html",
  styleUrls: ["./customer-modal.component.sass"],
})
export class CustomerModalComponent implements OnInit {
  customerForm: FormGroup;
  assistantFormSubmitted: boolean = false;
  submitted: boolean = false;
  _isEdit: boolean = false;
  _title: string = "";
  private _id: string = "";
  private _modalDataToPass: any;

  @Input("modalDataToPass")
  set modalDataToPass(value: any) {
    if (value) {
      this._modalDataToPass = value;
      this._id = this._modalDataToPass.id;
      if (this._id != "") this.getCustomerRecordById(this._id);
    }
  }

  @Output("emitData")
  emitData = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerServiceService
  ) {}

  ngOnInit(): void {
    this.customerFormCreation();
  }

  customerFormCreation() {
    this.customerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.email]],
      mobile: [""],
      address: [""],
      gst: [""],
      comments: [""],
      id: [""],
    });
  }

  get getCustomerFormControls() {
    return this.customerForm.controls;
  }

  closeModal() {
    this.customerForm.reset();
    this.submitted = false;
    this.emitData.emit("closemodal");
  }

  CustomerFormSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) return;

    const customer = new CustomerInformation();
    const customerFromControls = this.getCustomerFormControls;

    customer.Address = customerFromControls["address"].value;
    customer.Comments = customerFromControls["comments"].value;
    customer.Email = customerFromControls["email"].value;
    customer.GST = customerFromControls["gst"].value;
    customer.Mobile = customerFromControls["mobile"].value;
    customer.Name = customerFromControls["name"].value;
    customer.OwnerEmail = getLoggedInUserEmail();

    this.customerService.addCustomer(customer).subscribe((data) => {
      if (data.message === "customer added") {
        this.closeModal();
        this.emitData.emit("customer added");
      }
    }),
      (err) => {
        this.emitData.emit("error");
      };
  }

  getCustomerRecordById(id: string) {
    if (id) {
      this.customerService.getCustomerById(id).subscribe((customerRecord) => {
        const customerFromControls = this.getCustomerFormControls;
        customerFromControls["address"].setValue(customerRecord.Address);
        customerFromControls["comments"].setValue(customerRecord.Comments);
        customerFromControls["email"].setValue(customerRecord.Email);
        customerFromControls["gst"].setValue(customerRecord.GST);
        customerFromControls["mobile"].setValue(customerRecord.Mobile);
        customerFromControls["name"].setValue(customerRecord.Name);
        customerFromControls["id"].setValue(id);
      }),
        (err) => {};
    } else {
      this.closeModal();
    }
  }

  updateCustomerRecordById() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      this.emitData.emit("check form data");
      return;
    }

    const customer = new CustomerInformation();
    const customerFromControls = this.getCustomerFormControls;

    customer.Address = customerFromControls["address"].value;
    customer.Comments = customerFromControls["comments"].value;
    customer.Email = customerFromControls["email"].value;
    customer.GST = customerFromControls["gst"].value;
    customer.Mobile = customerFromControls["mobile"].value;
    customer.Name = customerFromControls["name"].value;
    customer.OwnerEmail = getLoggedInUserEmail();
    customer.Id = customerFromControls["id"].value;

    this.customerService.updateCustomerById(customer).subscribe((data) => {
      if (data.message === "customer update") {
        this.closeModal();
        this.emitData.emit("customer update");
      } else {
        this.emitData.emit("error");
      }
    }),
      (err) => {
        this.emitData.emit("error");
      };
  }
}
