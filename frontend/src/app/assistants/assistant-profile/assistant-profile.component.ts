import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Constants } from "src/app/helpers/constant";
import { MessageService } from "primeng/api";
import { ProfileService } from '../../services/profile.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "app-assistant-profile",
  templateUrl: "./assistant-profile.component.html",
  styleUrls: ["./assistant-profile.component.sass"],
})
export class AssistantProfileComponent implements OnInit {
  changePasswordForm: FormGroup;
  changePasswordSubmitted: boolean = false;
  isPasswordChanged: boolean = false;
  isPasswordMatched: boolean = false;
  isProfileLoadDone: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
      currentpassword: ["", Validators.required],
    });
  }

  get getChangePasswordFormControls() {
    return this.changePasswordForm.controls;
  }

  changePasswordFormSubmit() {
    this.changePasswordSubmitted = true;
    this.isProfileLoadDone = false;
    if (this.changePasswordForm.invalid) {
      this.isProfileLoadDone = true;
      this.updateToastMessage(
        "Password All Fields are Mandatory.",
        Constants.success,
        "Change Password Prompt"
      );
      return;
    }
    const currentPassword = this.getChangePasswordFormControls[
      "currentpassword"
    ].value;
    const newPassword = this.getChangePasswordFormControls["cpassword"].value;
    const confirmPassword = this.getChangePasswordFormControls["password"]
      .value;
    if (newPassword === confirmPassword) {
      this.profileService
        .updateAssistantPassword(newPassword, currentPassword)
        .subscribe((res) => {
          if (res.message === "password updated") {
            this.resetPasswordControls();
            this.isProfileLoadDone = true;
            this.updateToastMessage(
              "Password Updated successfully.",
              Constants.success,
              "Change Password"
            );
            setTimeout(() => {
              this.authService.logout();
            }, 2000);
          } else if (res.message === "old password is wrong") {
            this.resetPasswordControls();
            this.isProfileLoadDone = true;
            this.updateToastMessage(
              "Old Password is Wrong.",
              Constants.error,
              "Change Password"
            );
          }
        }),
        (err) => {
          if (err.status === 400) {
            this.updateToastMessage(
              err.error.error,
              Constants.error,
              "Change Password"
            );
          } else {
            this.updateToastMessage(
              err.error.error,
              Constants.error,
              "Change Password"
            );
          }
        };
    } else {
      this.isProfileLoadDone = true;
      this.updateToastMessage(
        "Both Passwords Must Match.",
        Constants.error,
        "Change Password"
      );
    }
  }

  resetPasswordControls() {
    let controls = this.getChangePasswordFormControls;
    controls["cpassword"].setValue("");
    controls["password"].setValue("");
    controls["currentpassword"].setValue("");
  }

  updateToastMessage(msg, severity, title) {
		this.messageService.clear();
		this.messageService.add({ severity: severity, summary: title, detail: msg });
	}
}
