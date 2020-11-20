import { Component, OnInit, Inject } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { AssistantInformation } from "../models/assistantinformation";
import { Constants } from "../helpers/constant";
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { BaseComponent } from "../components/base/base.component";
import { getLoggedInUserEmail } from "../helpers/utilities";
import { Router } from "@angular/router";

@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.sass"],
})
export class UsermanagementComponent extends BaseComponent implements OnInit {
  gridDatas: Array<AssistantInformation> = [];
  isLoadingDone: boolean = true;
  loadModal: boolean = false;
  loadAddEditModal: boolean = false;
  isThereDataForGrid: boolean = false;
  modalDataToPass: any;
  constructor(
    private confirmationService: ConfirmationService,
    private profileService: ProfileService,
    public messageService: MessageService,
    private router: Router
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.getAsstProfileInfo();
    this.isLoadingDone = false;
  }

  getAsstProfileInfo() {
    this.isLoadingDone = true;
    const masterEmail = getLoggedInUserEmail();

    if (masterEmail === "") this.router.navigateByUrl("/dashboard");

    this.profileService
      .getAssistantInformation(masterEmail)
      .subscribe((asstinfo) => {
        if (asstinfo.message.length > 0) {
          let datas = [];
          asstinfo.message.forEach((e) => {
            let obj = {
              ID: "",
              UserName: "",
              Dashboard: "",
              Plot: "",
              Executive: "",
              Sales: "",
              Report: "",
              Customer: "",
            };
            obj["UserName"] = e.UserName;
            obj["ID"] = e.id;

            //#region Dashboard checkboxes
            if (e.IsDashboard_read) {
              obj["Dashboard"] = "./assets/images/read.png";
            }
            if (e.IsDashboard_write) {
              obj["Dashboard"] = "./assets/images/write.png";
            }
            if (e.IsDashboard_update) {
              obj["Dashboard"] = "./assets/images/update.png";
            }
            if (e.IsDashboard_delete) {
              obj["Dashboard"] = "./assets/images/delete.png";
            }
            if (e.IsDashboard_read && e.IsDashboard_write) {
              obj["Dashboard"] = "./assets/images/read_write.png";
            }
            if (e.IsDashboard_read && e.IsDashboard_update) {
              obj["Dashboard"] = "./assets/images/read_update.png";
            }
            if (e.IsDashboard_read && e.IsDashboard_delete) {
              obj["Dashboard"] = "./assets/images/read_delete.png";
            }
            if (e.IsDashboard_write && e.IsDashboard_update) {
              obj["Dashboard"] = "./assets/images/write_update.png";
            }
            if (e.IsDashboard_write && e.IsDashboard_delete) {
              obj["Dashboard"] = "./assets/images/write_delete.png";
            }
            if (e.IsDashboard_delete && e.IsDashboard_update) {
              obj["Dashboard"] = "./assets/images/update_delete.png";
            }
            if (
              e.IsDashboard_read &&
              e.IsDashboard_write &&
              e.IsDashboard_update
            ) {
              obj["Dashboard"] = "./assets/images/read_write_update.png";
            }
            if (
              e.IsDashboard_read &&
              e.IsDashboard_delete &&
              e.IsDashboard_update
            ) {
              obj["Dashboard"] = "./assets/images/read_update_delete.png";
            }
            if (
              e.IsDashboard_read &&
              e.IsDashboard_delete &&
              e.IsDashboard_write
            ) {
              obj["Dashboard"] = "./assets/images/read_write_delete.png";
            }
            if (
              e.IsDashboard_delete &&
              e.IsDashboard_write &&
              e.IsDashboard_update
            ) {
              obj["Dashboard"] = "./assets/images/write_update_delete.png";
            }
            if (
              e.IsDashboard_read &&
              e.IsDashboard_write &&
              e.IsDashboard_update &&
              e.IsDashboard_delete
            ) {
              obj["Dashboard"] = "./assets/images/read_write_update_delete.png";
            }
            //#endregion

            //#region Plots checkboxes
            if (e.IsPlots_read) {
              obj["Plot"] = "./assets/images/read.png";
            }
            if (e.IsPlots_write) {
              obj["Plot"] = "./assets/images/write.png";
            }
            if (e.IsPlots_update) {
              obj["Plot"] = "./assets/images/update.png";
            }
            if (e.IsPlots_delete) {
              obj["Plot"] = "./assets/images/delete.png";
            }
            if (e.IsPlots_read && e.IsPlots_write) {
              obj["Plot"] = "./assets/images/read_write.png";
            }
            if (e.IsPlots_read && e.IsPlots_update) {
              obj["Plot"] = "./assets/images/read_update.png";
            }
            if (e.IsPlots_read && e.IsPlots_delete) {
              obj["Plot"] = "./assets/images/read_delete.png";
            }
            if (e.IsPlots_write && e.IsPlots_update) {
              obj["Plot"] = "./assets/images/write_update.png";
            }
            if (e.IsPlots_write && e.IsPlots_delete) {
              obj["Plot"] = "./assets/images/write_delete.png";
            }
            if (e.IsPlots_delete && e.IsPlots_update) {
              obj["Plot"] = "./assets/images/update_delete.png";
            }
            if (e.IsPlots_read && e.IsPlots_write && e.IsPlots_update) {
              obj["Plot"] = "./assets/images/read_write_update.png";
            }
            if (e.IsPlots_read && e.IsPlots_write && e.IsPlots_delete) {
              obj["Plot"] = "./assets/images/read_write_delete.png";
            }
            if (e.IsPlots_delete && e.IsPlots_write && e.IsPlots_update) {
              obj["Plot"] = "./assets/images/write_update_delete.png";
            }
            if (e.IsPlots_delete && e.IsPlots_read && e.IsPlots_update) {
              obj["Plot"] = "./assets/images/read_update_delete.png";
            }
            if (
              e.IsPlots_read &&
              e.IsPlots_write &&
              e.IsPlots_update &&
              e.IsPlots_delete
            ) {
              obj["Plot"] = "./assets/images/read_write_update_delete.png";
            }
            //#endregion

            //#region  executives checkboxes
            if (e.IsExecutives_read) {
              obj["Executive"] = "./assets/images/read.png";
            }
            if (e.IsExecutives_write) {
              obj["Executive"] = "./assets/images/write.png";
            }
            if (e.IsExecutives_update) {
              obj["Executive"] = "./assets/images/update.png";
            }
            if (e.IsExecutives_delete) {
              obj["Executive"] = "./assets/images/delete.png";
            }
            if (e.IsExecutives_read && e.IsExecutives_write) {
              obj["Executive"] = "./assets/images/read_write.png";
            }
            if (e.IsExecutives_read && e.IsExecutives_update) {
              obj["Executive"] = "./assets/images/read_update.png";
            }
            if (e.IsExecutives_read && e.IsExecutives_delete) {
              obj["Executive"] = "./assets/images/read_delete.png";
            }
            if (e.IsExecutives_write && e.IsExecutives_update) {
              obj["Executive"] = "./assets/images/write_update.png";
            }
            if (e.IsExecutives_write && e.IsExecutives_delete) {
              obj["Executive"] = "./assets/images/write_delete.png";
            }
            if (e.IsExecutives_delete && e.IsExecutives_update) {
              obj["Executive"] = "./assets/images/update_delete.png";
            }
            if (
              e.IsExecutives_read &&
              e.IsExecutives_write &&
              e.IsExecutives_update
            ) {
              obj["Executive"] = "./assets/images/read_write_update.png";
            }
            if (
              e.IsExecutives_delete &&
              e.IsExecutives_write &&
              e.IsExecutives_update
            ) {
              obj["Executive"] = "./assets/images/write_update_delete.png";
            }
            if (
              e.IsExecutives_delete &&
              e.IsExecutives_read &&
              e.IsExecutives_update
            ) {
              obj["Executive"] = "./assets/images/read_update_delete.png";
            }
            if (
              e.IsExecutives_read &&
              e.IsExecutives_delete &&
              e.IsExecutives_write
            ) {
              obj["Executive"] = "./assets/images/read_write_delete.png";
            }
            if (
              e.IsExecutives_read &&
              e.IsExecutives_write &&
              e.IsExecutives_update &&
              e.IsExecutives_delete
            ) {
              obj["Executive"] = "./assets/images/read_write_update_delete.png";
            }
            //#endregion

            //#region  sales checkboxes
            if (e.IsSales_read) {
              obj["Sales"] = "./assets/images/read.png";
            }
            if (e.IsSales_write) {
              obj["Sales"] = "./assets/images/write.png";
            }
            if (e.IsSales_update) {
              obj["Sales"] = "./assets/images/update.png";
            }
            if (e.IsSales_delete) {
              obj["Sales"] = "./assets/images/delete.png";
            }
            if (e.IsSales_read && e.IsSales_write) {
              obj["Sales"] = "./assets/images/read_write.png";
            }
            if (e.IsSales_read && e.IsSales_update) {
              obj["Sales"] = "./assets/images/read_update.png";
            }
            if (e.IsSales_read && e.IsSales_delete) {
              obj["Sales"] = "./assets/images/read_delete.png";
            }
            if (e.IsSales_write && e.IsSales_update) {
              obj["Sales"] = "./assets/images/write_update.png";
            }
            if (e.IsSales_write && e.IsSales_delete) {
              obj["Sales"] = "./assets/images/write_delete.png";
            }
            if (e.IsSales_delete && e.IsSales_update) {
              obj["Sales"] = "./assets/images/update_delete.png";
            }
            if (e.IsSales_read && e.IsSales_write && e.IsSales_update) {
              obj["Sales"] = "./assets/images/read_write_update.png";
            }
            if (e.IsSales_delete && e.IsSales_write && e.IsSales_update) {
              obj["Sales"] = "./assets/images/write_update_delete.png";
            }
            if (e.IsSales_read && e.IsSales_delete && e.IsSales_update) {
              obj["Sales"] = "./assets/images/read_update_delete.png";
            }
            if (e.IsSales_read && e.IsSales_delete && e.IsSales_write) {
              obj["Sales"] = "./assets/images/read_write_delete.png";
            }
            if (
              e.IsSales_read &&
              e.IsSales_write &&
              e.IsSales_update &&
              e.IsSales_delete
            ) {
              obj["Sales"] = "./assets/images/read_write_update_delete.png";
            }
            //#endregion

            //#region Reporst checkboxes
            if (e.IsReports_read) {
              obj["Report"] = "./assets/images/read.png";
            }
            if (e.IsReports_write) {
              obj["Report"] = "./assets/images/write.png";
            }
            if (e.IsReports_update) {
              obj["Report"] = "./assets/images/update.png";
            }
            if (e.IsReports_delete) {
              obj["Report"] = "./assets/images/delete.png";
            }
            if (e.IsReports_read && e.IsReports_write) {
              obj["Report"] = "./assets/images/read_write.png";
            }
            if (e.IsReports_read && e.IsReports_update) {
              obj["Report"] = "./assets/images/read_update.png";
            }
            if (e.IsReports_read && e.IsReports_delete) {
              obj["Report"] = "./assets/images/read_delete.png";
            }
            if (e.IsReports_write && e.IsReports_update) {
              obj["Report"] = "./assets/images/write_update.png";
            }
            if (e.IsReports_write && e.IsReports_delete) {
              obj["Report"] = "./assets/images/write_delete.png";
            }
            if (e.IsReports_delete && e.IsReports_update) {
              obj["Report"] = "./assets/images/update_delete.png";
            }
            if (e.IsReports_read && e.IsReports_write && e.IsReports_update) {
              obj["Report"] = "./assets/images/read_write_update.png";
            }
            if (e.IsReports_delete && e.IsReports_write && e.IsReports_update) {
              obj["Report"] = "./assets/images/write_update_delete.png";
            }
            if (e.IsReports_read && e.IsReports_delete && e.IsReports_update) {
              obj["Report"] = "./assets/images/read_update_delete.png";
            }
            if (e.IsReports_read && e.IsReports_delete && e.IsReports_write) {
              obj["Report"] = "./assets/images/read_write_delete.png";
            }
            if (
              e.IsReports_read &&
              e.IsReports_write &&
              e.IsReports_update &&
              e.IsReports_delete
            ) {
              obj["Report"] = "./assets/images/read_write_update_delete.png";
            }
            //#endregion

            //#region  customers checkboxes
            if (e.IsCustomers_read) {
              obj["Customer"] = "./assets/images/read.png";
            }
            if (e.IsCustomers_write) {
              obj["Customer"] = "./assets/images/write.png";
            }
            if (e.IsCustomers_update) {
              obj["Customer"] = "./assets/images/update.png";
            }
            if (e.IsCustomers_delete) {
              obj["Customer"] = "./assets/images/delete.png";
            }
            if (e.IsCustomers_read && e.IsCustomers_write) {
              obj["Customer"] = "./assets/images/read_write.png";
            }
            if (e.IsCustomers_read && e.IsCustomers_update) {
              obj["Customer"] = "./assets/images/read_update.png";
            }
            if (e.IsCustomers_read && e.IsCustomers_delete) {
              obj["Customer"] = "./assets/images/read_delete.png";
            }
            if (e.IsCustomers_write && e.IsCustomers_update) {
              obj["Customer"] = "./assets/images/write_update.png";
            }
            if (e.IsCustomers_write && e.IsCustomers_delete) {
              obj["Customer"] = "./assets/images/write_delete.png";
            }
            if (e.IsCustomers_delete && e.IsCustomers_update) {
              obj["Customer"] = "./assets/images/update_delete.png";
            }
            if (
              e.IsCustomers_read &&
              e.IsCustomers_write &&
              e.IsCustomers_update
            ) {
              obj["Customer"] = "./assets/images/read_write_update.png";
            }
            if (
              e.IsCustomers_read &&
              e.IsCustomers_delete &&
              e.IsCustomers_write
            ) {
              obj["Customer"] = "./assets/images/read_write_delete.png";
            }
            if (
              e.IsCustomers_delete &&
              e.IsCustomers_write &&
              e.IsCustomers_update
            ) {
              obj["Customer"] = "./assets/images/write_update_delete.png";
            }
            if (
              e.IsCustomers_read &&
              e.IsCustomers_delete &&
              e.IsCustomers_update
            ) {
              obj["Customer"] = "./assets/images/read_update_delete.png";
            }
            if (
              e.IsCustomers_read &&
              e.IsCustomers_write &&
              e.IsCustomers_update &&
              e.IsCustomers_delete
            ) {
              obj["Customer"] = "./assets/images/read_write_update_delete.png";
            }
            //#endregion
            datas.push(obj);
          });
          this.isThereDataForGrid = true;
          this.gridDatas = datas;
        } else {
          this.isThereDataForGrid = false;
        }

        this.isLoadingDone = false;
      });
  }

  // Handle all the model response
  handleSureDialogResult($event) {
    if ($event == "close") {
      this.loadAddEditModal = false;
    } else if ($event == "success") {
      this.loadAddEditModal = false;
      this.getAsstProfileInfo();
      this.updateToastMessage(
        "Assistant Added successfully",
        Constants.success,
        "Assistant Information"
      );
    } else if ($event == "assistant not created") {
      this.loadAddEditModal = false;
      this.updateToastMessage(
        "Assistant Not Created. Please Try again",
        Constants.error,
        "Assistant Information"
      );
    } else if ($event == "assistant already exists") {
      this.loadAddEditModal = false;
      this.updateToastMessage(
        "Assistant Already Exist.",
        Constants.error,
        "Assistant Information"
      );
    } else if ($event == "cant update the assitant") {
      this.loadAddEditModal = false;
      this.updateToastMessage(
        "Can't update the assitant.",
        Constants.error,
        "Assistant Information"
      );
    } else if ($event == "assistant updated") {
      this.loadAddEditModal = false;
      this.getAsstProfileInfo();
      this.updateToastMessage(
        "Assistant updated successfully.",
        Constants.success,
        "Assistant Information"
      );
    }
  }

  openDialog() {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      selectedRecordUsername: "",
      dialog_title: "Add Assistant Information",
      isEdit: false,
    };
  }

  editAssistant(username) {
    this.loadAddEditModal = true;
    this.modalDataToPass = {
      selectedRecordUsername: username,
      dialog_title: "Edit Assistant Information",
      isEdit: true,
    };
  }

  deleteAssistant(username): void {
    this.modalDataToPass = {
      selectedRecordUsername: username,
    };
    this.loadModal = true;

    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the assistant
        ${this.modalDataToPass.selectedRecordUsername}`,
      header: "Delete Assistant",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (this.modalDataToPass.selectedRecordUsername !== "") {
          this.profileService
            .deleteAssistantRecord(
              getLoggedInUserEmail(),
              this.modalDataToPass.selectedRecordUsername
            )
            .subscribe((res) => {
              if (res.message === "success") {
                this.getAsstProfileInfo();
                this.modalDataToPass.selectedRecordUsername = "";
                this.loadModal = false;
                this.updateToastMessage(
                  "Assistant Information Deleted Successfully",
                  Constants.success,
                  "Assistant Information"
                );
              }
            });
        }
      },
      reject: () => {
        this.modalDataToPass = {
          selectedRecordUsername: "",
        };
      },
    });
  }
}
