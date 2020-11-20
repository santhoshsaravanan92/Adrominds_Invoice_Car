import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "../services/profile.service";
import { AssistantInformation } from "../models/assistantinformation";
import { getLoggedInUserEmail } from "../helpers/utilities";

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "./assitant.modaltemplate.component.html",
  styleUrls: ["./usermanagement.component.sass"],
})
export class DialogOverviewExampleDialog {
  assistantForm: FormGroup;
  assistantFormSubmitted: boolean = false;
  selectedFeatures: Array<string> = [];
  ischkBoxError: boolean = false;

  _isEdit: boolean = false;
  _title: string = "";
  private _selectedRecordId: string = "";
  private _modalDataToPass: any;

  @Input("modalDataToPass")
  set modalDataToPass(value: any) {
    if (value) {
      this._modalDataToPass = value;
      this._title = this._modalDataToPass.dialog_title;
      this._selectedRecordId = this._modalDataToPass.selectedRecordId;
      this._isEdit = this._modalDataToPass.isEdit;
      this.resetFormControls();
      this.getAssistantRecordById(this._selectedRecordId);
      this.selectedFeatures = [];
    }
  }

  @Output("emitData")
  emitData = new EventEmitter<string>();

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assistantFormCreation();
    this.resetFormControls();
  }

  assistantFormCreation() {
    this.assistantForm = this.formBuilder.group({
      asstusername: ["", [Validators.required, Validators.email]],
      asstpassword: ["", Validators.required],
      dashboard_read: [false],
      dashboard_write: [false],
      dashboard_update: [false],
      dashboard_delete: [false],
      plots_read: [false],
      plots_write: [false],
      plots_update: [false],
      plots_delete: [false],
      executives_read: [false],
      executives_write: [false],
      executives_update: [false],
      executives_delete: [false],
      reports_read: [false],
      reports_write: [false],
      reports_update: [false],
      reports_delete: [false],
      sales_read: [false],
      sales_write: [false],
      sales_update: [false],
      sales_delete: [false],
      customers_read: [false],
      customers_write: [false],
      customers_update: [false],
      customers_delete: [false],
      //   invoice_read: [false, Validators.requiredTrue],
      //   invoice_write: [false, Validators.requiredTrue],
      //   invoice_update: [false, Validators.requiredTrue],
      //   invoice_delete: [false, Validators.requiredTrue],
    });
  }

  get getAssistantFormControls() {
    return this.assistantForm.controls;
  }

  assistantFormSubmit() {
    this.assistantFormSubmitted = true;
    if (this.selectedFeatures.length === 0) {
      this.ischkBoxError = true;
      setTimeout(() => {
        this.ischkBoxError = false;
      }, 2000);
    } else {
      if (this.assistantForm.invalid) return;

      const asstProfile = new AssistantInformation();
      const asstControl = this.getAssistantFormControls;
      asstProfile.MasterEmail = getLoggedInUserEmail();
      asstProfile.UserName = asstControl["asstusername"].value;
      asstProfile.Password = asstControl["asstpassword"].value;

      if (this.selectedFeatures.indexOf("dashboard_read") !== -1)
        asstProfile.IsDashboard_read = true;
      else asstProfile.IsDashboard_read = false;
      if (this.selectedFeatures.indexOf("dashboard_write") !== -1)
        asstProfile.IsDashboard_write = true;
      else asstProfile.IsDashboard_write = false;
      if (this.selectedFeatures.indexOf("dashboard_update") !== -1)
        asstProfile.IsDashboard_update = true;
      else asstProfile.IsDashboard_update = false;
      if (this.selectedFeatures.indexOf("dashboard_delete") !== -1)
        asstProfile.IsDashboard_delete = true;
      else asstProfile.IsDashboard_delete = false;
      if (this.selectedFeatures.indexOf("plots_read") !== -1)
        asstProfile.IsPlots_read = true;
      else asstProfile.IsPlots_read = false;
      if (this.selectedFeatures.indexOf("plots_write") !== -1)
        asstProfile.IsPlots_write = true;
      else asstProfile.IsPlots_write = false;
      if (this.selectedFeatures.indexOf("plots_update") !== -1)
        asstProfile.IsPlots_update = true;
      else asstProfile.IsPlots_update = false;
      if (this.selectedFeatures.indexOf("plots_delete") !== -1)
        asstProfile.IsPlots_delete = true;
      else asstProfile.IsPlots_delete = false;
      if (this.selectedFeatures.indexOf("executives_read") !== -1)
        asstProfile.IsExecutives_read = true;
      else asstProfile.IsExecutives_read = false;
      if (this.selectedFeatures.indexOf("executives_write") !== -1)
        asstProfile.IsExecutives_write = true;
      else asstProfile.IsExecutives_write = false;
      if (this.selectedFeatures.indexOf("executives_update") !== -1)
        asstProfile.IsExecutives_update = true;
      else asstProfile.IsExecutives_update = false;
      if (this.selectedFeatures.indexOf("executives_delete") !== -1)
        asstProfile.IsExecutives_delete = true;
      else asstProfile.IsExecutives_delete = false;
      if (this.selectedFeatures.indexOf("sales_read") !== -1)
        asstProfile.IsSales_read = true;
      else asstProfile.IsSales_read = false;
      if (this.selectedFeatures.indexOf("sales_write") !== -1)
        asstProfile.IsSales_write = true;
      else asstProfile.IsSales_write = false;
      if (this.selectedFeatures.indexOf("sales_update") !== -1)
        asstProfile.IsSales_update = true;
      else asstProfile.IsSales_update = false;
      if (this.selectedFeatures.indexOf("sales_delete") !== -1)
        asstProfile.IsSales_delete = true;
      else asstProfile.IsSales_delete = false;
      if (this.selectedFeatures.indexOf("reports_read") !== -1)
        asstProfile.IsReports_read = true;
      else asstProfile.IsReports_read = false;
      if (this.selectedFeatures.indexOf("reports_write") !== -1)
        asstProfile.IsReports_write = true;
      else asstProfile.IsReports_write = false;
      if (this.selectedFeatures.indexOf("reports_update") !== -1)
        asstProfile.IsReports_update = true;
      else asstProfile.IsReports_update = false;
      if (this.selectedFeatures.indexOf("reports_delete") !== -1)
        asstProfile.IsReports_delete = true;
      else asstProfile.IsReports_delete = false;
      if (this.selectedFeatures.indexOf("customers_read") !== -1)
        asstProfile.IsCustomers_read = true;
      else asstProfile.IsCustomers_read = false;
      if (this.selectedFeatures.indexOf("customers_write") !== -1)
        asstProfile.IsCustomers_write = true;
      else asstProfile.IsCustomers_write = false;
      if (this.selectedFeatures.indexOf("customers_update") !== -1)
        asstProfile.IsCustomers_update = true;
      else asstProfile.IsCustomers_update = false;
      if (this.selectedFeatures.indexOf("customers_delete") !== -1)
        asstProfile.IsCustomers_delete = true;
      else asstProfile.IsCustomers_delete = false;
      //   if (this.selectedFeatures.indexOf("invoice_read") !== -1)
      //     asstProfile.IsInvoice_read = true;
      //   else asstProfile.IsInvoice_read = false;
      //   if (this.selectedFeatures.indexOf("invoice_write") !== -1)
      //     asstProfile.IsInvoice_write = true;
      //   else asstProfile.IsInvoice_write = false;
      //   if (this.selectedFeatures.indexOf("invoice_update") !== -1)
      //     asstProfile.IsInvoice_update = true;
      //   else asstProfile.IsInvoice_update = false;
      //   if (this.selectedFeatures.indexOf("invoice_delete") !== -1)
      //     asstProfile.IsInvoice_delete = true;
      //   else asstProfile.IsInvoice_delete = false;

      this.profileService
        .addAssistantInformation(asstProfile)
        .subscribe((response) => {
          this.resetFormControls();
          if (response.message === "assistant already exist") {
            this.emitData.emit("assistant already exists");
          } else if (response.message === "assistant added") {
            this.emitData.emit("success");
          } else if (response.message === "assistant not created") {
            this.emitData.emit("assistant not created");
          }
        }),
        (err) => {
          this.emitData.emit("error");
        };
    }
    this.selectedFeatures = [];
  }

  resetFormControls() {
    this.assistantForm.reset();
    this.assistantFormSubmitted = false;
  }

  onCheckboxChange(event) {
    event.preventDefault();
    if (event.target.checked) {
      if (!this.selectedFeatures.includes(event.target.value)) {
        this.selectedFeatures.push(event.target.value);
      }
    } else {
      if (this.selectedFeatures.includes(event.target.value)) {
        const index: number = this.selectedFeatures.indexOf(event.target.value);
        if (index !== -1) {
          this.selectedFeatures.splice(index, 1);
        }
      }
    }
  }

  getAssistantRecordById(id: string): void {
    if (id != "") {
      this.resetFormControls();
      this.profileService
        .getAssistantRecordById(this._modalDataToPass.selectedRecordUsername)
        .subscribe((assistInfo) => {
          const controls = this.getAssistantFormControls;
          controls["asstusername"].setValue(assistInfo.result.UserName);

          if (assistInfo.result.IsDashboard_read) {
            controls["dashboard_read"].setValue(true);
            this.selectedFeatures.push("dashboard_read");
          } else controls["dashboard_read"].setValue(false);

          if (assistInfo.result.IsDashboard_write) {
            controls["dashboard_write"].setValue(true);
            this.selectedFeatures.push("dashboard_write");
          } else controls["dashboard_write"].setValue(false);

          if (assistInfo.result.IsDashboard_update) {
            controls["dashboard_update"].setValue(true);
            this.selectedFeatures.push("dashboard_update");
          } else controls["dashboard_update"].setValue(false);

          if (assistInfo.result.IsDashboard_delete) {
            controls["dashboard_delete"].setValue(true);
            this.selectedFeatures.push("dashboard_delete");
          } else controls["dashboard_delete"].setValue(false);

          if (assistInfo.result.IsPlots_read) {
            controls["plots_read"].setValue(true);
            this.selectedFeatures.push("plots_read");
          } else controls["plots_read"].setValue(false);

          if (assistInfo.result.IsPlots_write) {
            controls["plots_write"].setValue(true);
            this.selectedFeatures.push("plots_write");
          } else controls["plots_write"].setValue(false);

          if (assistInfo.result.IsPlots_update) {
            controls["plots_update"].setValue(true);
            this.selectedFeatures.push("plots_update");
          } else controls["plots_update"].setValue(false);

          if (assistInfo.result.IsPlots_delete) {
            controls["plots_delete"].setValue(true);
            this.selectedFeatures.push("plots_delete");
          } else controls["plots_delete"].setValue(false);
          if (assistInfo.result.IsExecutives_read) {
            controls["executives_read"].setValue(true);
            this.selectedFeatures.push("executives_read");
          } else controls["executives_read"].setValue(false);

          if (assistInfo.result.IsExecutives_write) {
            controls["executives_write"].setValue(true);
            this.selectedFeatures.push("executives_write");
          } else controls["executives_write"].setValue(false);

          if (assistInfo.result.IsExecutives_update) {
            controls["executives_update"].setValue(true);
            this.selectedFeatures.push("executives_update");
          } else controls["executives_update"].setValue(false);

          if (assistInfo.result.IsExecutives_delete) {
            controls["executives_delete"].setValue(true);
            this.selectedFeatures.push("executives_delete");
          } else controls["executives_delete"].setValue(false);

          if (assistInfo.result.IsSales_read) {
            controls["sales_read"].setValue(true);
            this.selectedFeatures.push("sales_read");
          } else controls["sales_read"].setValue(false);

          if (assistInfo.result.IsSales_write) {
            controls["sales_write"].setValue(true);
            this.selectedFeatures.push("sales_write");
          } else controls["sales_write"].setValue(false);

          if (assistInfo.result.IsSales_update) {
            controls["sales_update"].setValue(true);
            this.selectedFeatures.push("sales_update");
          } else controls["sales_update"].setValue(false);

          if (assistInfo.result.IsSales_delete) {
            controls["sales_delete"].setValue(true);
            this.selectedFeatures.push("sales_delete");
          } else controls["sales_delete"].setValue(false);

          if (assistInfo.result.IsReports_read) {
            controls["reports_read"].setValue(true);
            this.selectedFeatures.push("reports_read");
          } else controls["reports_read"].setValue(false);

          if (assistInfo.result.IsReports_write) {
            controls["reports_write"].setValue(true);
            this.selectedFeatures.push("reports_write");
          } else controls["reports_write"].setValue(false);

          if (assistInfo.result.IsReports_update) {
            controls["reports_update"].setValue(true);
            this.selectedFeatures.push("reports_update");
          } else controls["reports_update"].setValue(false);

          if (assistInfo.result.IsReports_delete) {
            controls["reports_delete"].setValue(true);
            this.selectedFeatures.push("reports_delete");
          } else controls["reports_delete"].setValue(false);

          if (assistInfo.result.IsCustomers_read) {
            controls["customers_read"].setValue(true);
            this.selectedFeatures.push("customers_read");
          } else controls["customers_read"].setValue(false);

          if (assistInfo.result.IsCustomers_write) {
            controls["customers_write"].setValue(true);
            this.selectedFeatures.push("customers_write");
          } else controls["customers_write"].setValue(false);

          if (assistInfo.result.IsCustomers_update) {
            controls["customers_update"].setValue(true);
            this.selectedFeatures.push("customers_update");
          } else controls["customers_update"].setValue(false);

          if (assistInfo.result.IsCustomers_delete) {
            controls["customers_delete"].setValue(true);
            this.selectedFeatures.push("customers_delete");
          } else controls["customers_delete"].setValue(false);

          //   if (assistInfo.result.IsInvoice_read) {
          //     controls["invoice_read"].setValue(true);
          //     this.selectedFeatures.push("invoice_read");
          //   } else controls["invoice_read"].setValue(false);

          //   if (assistInfo.result.IsInvoice_write) {
          //     controls["invoice_write"].setValue(true);
          //     this.selectedFeatures.push("invoice_write");
          //   } else controls["invoice_write"].setValue(false);

          //   if (assistInfo.result.IsInvoice_update) {
          //     controls["invoice_update"].setValue(true);
          //     this.selectedFeatures.push("invoice_update");
          //   } else controls["invoice_update"].setValue(false);

          //   if (assistInfo.result.IsInvoice_delete) {
          //     controls["invoice_delete"].setValue(true);
          //     this.selectedFeatures.push("invoice_delete");
          //   } else controls["invoice_delete"].setValue(false);
        });
      //this.resetFormControls();
    } else {
      //TODO: no assistant found goes here
      this.resetFormControls();
    }
  }

  updateAssistantRecordById() {
    this.assistantFormSubmitted = true;
    if (this.selectedFeatures.length === 0) {
      this.ischkBoxError = true;
      setTimeout(() => {
        this.ischkBoxError = false;
      }, 2000);
    } else {
      const asstProfile = new AssistantInformation();
      const asstControl = this.getAssistantFormControls;
      asstProfile.MasterEmail = getLoggedInUserEmail();
      asstProfile.UserName = asstControl["asstusername"].value;
      //asstProfile.Password = asstControl['asstpassword'].value;

      if (this.selectedFeatures.indexOf("dashboard_read") !== -1)
        asstProfile.IsDashboard_read = true;
      else asstProfile.IsDashboard_read = false;
      if (this.selectedFeatures.indexOf("dashboard_write") !== -1)
        asstProfile.IsDashboard_write = true;
      else asstProfile.IsDashboard_write = false;
      if (this.selectedFeatures.indexOf("dashboard_update") !== -1)
        asstProfile.IsDashboard_update = true;
      else asstProfile.IsDashboard_update = false;
      if (this.selectedFeatures.indexOf("dashboard_delete") !== -1)
        asstProfile.IsDashboard_delete = true;
      else asstProfile.IsDashboard_delete = false;
      if (this.selectedFeatures.indexOf("plots_read") !== -1)
        asstProfile.IsPlots_read = true;
      else asstProfile.IsPlots_read = false;
      if (this.selectedFeatures.indexOf("plots_write") !== -1)
        asstProfile.IsPlots_write = true;
      else asstProfile.IsPlots_write = false;
      if (this.selectedFeatures.indexOf("plots_update") !== -1)
        asstProfile.IsPlots_update = true;
      else asstProfile.IsPlots_update = false;
      if (this.selectedFeatures.indexOf("plots_delete") !== -1)
        asstProfile.IsPlots_delete = true;
      else asstProfile.IsPlots_delete = false;
      if (this.selectedFeatures.indexOf("executives_read") !== -1)
        asstProfile.IsExecutives_read = true;
      else asstProfile.IsExecutives_read = false;
      if (this.selectedFeatures.indexOf("executives_write") !== -1)
        asstProfile.IsExecutives_write = true;
      else asstProfile.IsExecutives_write = false;
      if (this.selectedFeatures.indexOf("executives_update") !== -1)
        asstProfile.IsExecutives_update = true;
      else asstProfile.IsExecutives_update = false;
      if (this.selectedFeatures.indexOf("executives_delete") !== -1)
        asstProfile.IsExecutives_delete = true;
      else asstProfile.IsExecutives_delete = false;
      if (this.selectedFeatures.indexOf("sales_read") !== -1)
        asstProfile.IsSales_read = true;
      else asstProfile.IsSales_read = false;
      if (this.selectedFeatures.indexOf("sales_write") !== -1)
        asstProfile.IsSales_write = true;
      else asstProfile.IsSales_write = false;
      if (this.selectedFeatures.indexOf("sales_update") !== -1)
        asstProfile.IsSales_update = true;
      else asstProfile.IsSales_update = false;
      if (this.selectedFeatures.indexOf("sales_delete") !== -1)
        asstProfile.IsSales_delete = true;
      else asstProfile.IsSales_delete = false;
      if (this.selectedFeatures.indexOf("reports_read") !== -1)
        asstProfile.IsReports_read = true;
      else asstProfile.IsReports_read = false;
      if (this.selectedFeatures.indexOf("reports_write") !== -1)
        asstProfile.IsReports_write = true;
      else asstProfile.IsReports_write = false;
      if (this.selectedFeatures.indexOf("reports_update") !== -1)
        asstProfile.IsReports_update = true;
      else asstProfile.IsReports_update = false;
      if (this.selectedFeatures.indexOf("reports_delete") !== -1)
        asstProfile.IsReports_delete = true;
      else asstProfile.IsReports_delete = false;
      if (this.selectedFeatures.indexOf("customers_read") !== -1)
        asstProfile.IsCustomers_read = true;
      else asstProfile.IsCustomers_read = false;
      if (this.selectedFeatures.indexOf("customers_write") !== -1)
        asstProfile.IsCustomers_write = true;
      else asstProfile.IsCustomers_write = false;
      if (this.selectedFeatures.indexOf("customers_update") !== -1)
        asstProfile.IsCustomers_update = true;
      else asstProfile.IsCustomers_update = false;
      if (this.selectedFeatures.indexOf("customers_delete") !== -1)
        asstProfile.IsCustomers_delete = true;
      else asstProfile.IsCustomers_delete = false;
      // if (this.selectedFeatures.indexOf("invoice_read") !== -1)
      //   asstProfile.IsInvoice_read = true;
      // else asstProfile.IsInvoice_read = false;
      // if (this.selectedFeatures.indexOf("invoice_write") !== -1)
      //   asstProfile.IsInvoice_write = true;
      // else asstProfile.IsInvoice_write = false;
      // if (this.selectedFeatures.indexOf("invoice_update") !== -1)
      //   asstProfile.IsInvoice_update = true;
      // else asstProfile.IsInvoice_update = false;
      // if (this.selectedFeatures.indexOf("invoice_delete") !== -1)
      //   asstProfile.IsInvoice_delete = true;
      // else asstProfile.IsInvoice_delete = false;

      this.profileService
        .updateAssistantRecordById(asstProfile)
        .subscribe((a) => {
          if (a != null) {
            this._modalDataToPass.selectedRecordUsername = "";
            if (a.message === "cant update the assitant")
              this.emitData.emit("cant update the assitant");
            else if (a.message === "success") {
              this.emitData.emit("assistant updated");
              this.selectedFeatures.splice(0, this.selectedFeatures.length);
            }
          }
        }),
        (err) => {
          this.emitData.emit("error");
        };
      this.resetFormControls();
    }
  }

  closeModal() {
    this.assistantForm.reset();
    this.selectedFeatures = [];
    this.emitData.emit("close");
  }
}
