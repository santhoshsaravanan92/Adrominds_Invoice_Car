import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "../services/profile.service";
import { PersonalInformation } from "../models/personalinformation";
import { AuthenticationService } from "../services/authentication.service";
import { Constants } from "../helpers/constant";
import { MessageService } from "primeng/api";
import { environment } from "../../environments/environment";
import { isAssistant, getLoggedInUserEmail } from "../helpers/utilities";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"],
})
export class ProfileComponent implements OnInit {
  personalinformationForm: FormGroup;
  changePasswordForm: FormGroup;
  errorMessage: string = "";
  submitted: boolean = false;
  changePasswordSubmitted: boolean = false;
  isPasswordChanged: boolean = false;
  isPasswordMatched: boolean = false;
  selectedImage: File;
  isProfileLoadDone: boolean = true;
  logo: Array<File>;
  log: any;
  showUploadButton: boolean = false;
  shallHide: boolean = false;
  email: string = "";
  showSaveProfileButton: boolean = false;
  showUpdatePasswordButton: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.personalinformationForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.email]],
      mobile: ["", [Validators.required, Validators.min(10)]],
      address: ["", Validators.required],
      company: ["", Validators.required],
      gst: [""],
      logo: [""],
      landline: [""],
      website: [""],
      accountnumber: [""],
      branchname: [""],
      bankname: [""],
      ifsc: [""],
    });

    this.changePasswordForm = this.formBuilder.group({
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
      currentpassword: ["", Validators.required],
    });
    this.getProfileInfo();
    this.disablePersonalInfoForm(true);
    this.log =
      environment.baseurl + "/images/" + getLoggedInUserEmail() + ".jpg";
    this.togglechangePasswordFieldSet();
  }

  get getFormControls() {
    return this.personalinformationForm.controls;
  }

  get getChangePasswordFormControls() {
    return this.changePasswordForm.controls;
  }

  getProfileInfo() {
    this.isProfileLoadDone = false;
    if (!isAssistant()) this.email = getLoggedInUserEmail();
    this.profileService
      .getProfileInformation(this.email)
      .subscribe((profileData) => {
        this.isProfileLoadDone = true;
        const controls = this.getFormControls;
        controls["name"].setValue(profileData.data.Name);
        controls["email"].setValue(profileData.data.Email);
        controls["mobile"].setValue(profileData.data.Mobile);
        controls["gst"].setValue(profileData.data.GST);
        controls["address"].setValue(profileData.data.Address);
        controls["company"].setValue(profileData.data.Company);
        controls["landline"].setValue(profileData.data.Landline);
        controls["website"].setValue(profileData.data.Website);
        controls["accountnumber"].setValue(profileData.data.AccountNumber);
        controls["branchname"].setValue(profileData.data.Branchname);
        controls["bankname"].setValue(profileData.data.Bankname);
        controls["ifsc"].setValue(profileData.data.Ifsc);
      }),
      (err) => {
        if (err.staus === 401) {
          console.log(err);
          this.isProfileLoadDone = true;
          this.updateToastMessage(
            Constants.invalidEmail,
            Constants.error,
            "Personal Information"
          );
        } else {
          console.log(err);
          this.isProfileLoadDone = true;
          this.updateToastMessage(
            Constants.invalidEmail,
            Constants.error,
            "Personal Information"
          );
        }
      };
  }

  personalInfoFormSubmit() {
    this.submitted = true;
    this.isProfileLoadDone = false;
    if (this.personalinformationForm.invalid) {
      this.isProfileLoadDone = true;
      return;
    }

    let profile = new PersonalInformation();
    const controls = this.getFormControls;

    profile.Name = controls["name"].value;
    profile.Email = controls["email"].value;
    profile.Mobile = controls["mobile"].value;
    profile.Address = controls["address"].value;
    profile.GST = controls["gst"].value;
    profile.Company = controls["company"].value;
    profile.Landline = controls["landline"].value;
    profile.Website = controls["website"].value;
    profile.AccountNumber = controls["accountnumber"].value;
    profile.Branchname = controls["branchname"].value;
    profile.Bankname = controls["bankname"].value;
    profile.Ifsc = controls["ifsc"].value;

    this.profileService
      .updateProfileInformation(profile)
      .subscribe((updatedResponse) => {
        // TODO: validate response 1 for success 0 for failure
        this.updateToastMessage(
          "Profile Updated successfully",
          Constants.success,
          "Personal Information"
        );
        this.disablePersonalInfoForm(true);
        this.isProfileLoadDone = true;
      }),
      (err) => {
        console.log(err);
        this.updateToastMessage(
          "Something Went Wrong. Try again later",
          Constants.error,
          "Personal Information"
        );
      };
  }

  onCurrentPasswordChange(event) {
    console.log(event.target.value);
    if (event.target.value) this.showUpdatePasswordButton = true;
    else this.showUpdatePasswordButton = false;
  }

  changePasswordFormSubmit() {
    this.changePasswordSubmitted = true;
    this.isProfileLoadDone = false;
    if (this.changePasswordForm.invalid) {
      this.isProfileLoadDone = true;
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
        .updatePassword(newPassword, currentPassword)
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

  disablePersonalInfoForm(isDisabled: boolean) {
    let controls = this.getFormControls;
    // let btnControl = document.getElementById('btnSaveProfrofile');

    if (isDisabled) {
      controls["name"].disable();
      controls["mobile"].disable();
      controls["gst"].disable();
      controls["address"].disable();
      controls["logo"].disable();
      controls["company"].disable();
      controls["landline"].disable();
      controls["accountnumber"].disable();
      controls["branchname"].disable();
      controls["bankname"].disable();
      controls["ifsc"].disable();
      // btnControl.setAttribute('disabled', 'true');
      this.showSaveProfileButton = false;
    } else {
      controls["name"].enable();
      controls["mobile"].enable();
      controls["gst"].enable();
      controls["address"].enable();
      controls["logo"].enable();
      controls["company"].enable();
      controls["landline"].enable();
      controls["accountnumber"].enable();
      controls["branchname"].enable();
      controls["bankname"].enable();
      controls["ifsc"].enable();
      // btnControl.removeAttribute('disabled');
      this.showSaveProfileButton = true;
    }
  }

  disableImageUploadControls(isDisabled: boolean) {
    let btnUploadCancel = document.getElementById("btnUploadCancel");
    let btnUpload = document.getElementById("btnUpload");

    if (isDisabled) {
      btnUploadCancel.setAttribute("disabled", "true");
      btnUpload.setAttribute("disabled", "true");
    } else {
      btnUploadCancel.removeAttribute("disabled");
      btnUpload.removeAttribute("disabled");
    }
  }

  onFileChanged(files) {
    if (files.length === 0) {
      this.updateToastMessage(
        "Select a File First.",
        Constants.error,
        "Upload Image"
      );
      return;
    }

    //const mimetype = files[0].type;
    //console.log(mimetype);
    // if (mimetype != 'image/jpg' || mimetype != "image/jpeg") {
    // 	this.updateToastMessage('Only JPG images are support', Constants.error, 'Upload Image');
    // 	document.getElementById('fileUploadControl').value = [];
    // 	return;
    // }
    this.disableImageUploadControls(false);
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.log = reader.result;
      this.logo = files;
    };
  }

  uploadImage() {
    this.isProfileLoadDone = false;
    if (this.logo !== [] && this.logo !== undefined) {
      this.profileService.uploadImage(this.logo).subscribe(
        (res) => {
          this.toggleEditLogo();
          this.isProfileLoadDone = true;
          this.disableImageUploadControls(true);
          this.updateToastMessage(
            "Image Uploaded Sucessfully",
            Constants.success,
            "Upload Image"
          );
        },
        (err) => {
          console.log(err);
          this.isProfileLoadDone = true;
          this.disableImageUploadControls(false);
          this.updateToastMessage(
            "Only Jpeg/Jpg image format alone supported",
            Constants.error,
            "Upload Image"
          );
          // TODO:
          //document.getElementById('fileUploadControl').value = [];
        }
      ),
        (err) => {
          console.log(err);
          // TODO:
          //document.getElementById('fileUploadControl').value = [];
          this.log = "";
        };
    } else {
      this.updateToastMessage(
        "Select a File First.",
        Constants.error,
        "Upload Image"
      );
      this.isProfileLoadDone = true;
    }
  }

  updateToastMessage(msg, severity, title) {
    this.messageService.clear();
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: msg,
    });
  }

  toggleEditLogo() {
    if (this.showUploadButton) {
      this.showUploadButton = false;
      this.shallHide = false;
      this.disableImageUploadControls(true);
    } else {
      this.showUploadButton = true;
      this.shallHide = true;
    }
  }

  togglechangePasswordFieldSet() {
    let element: HTMLElement = document.getElementById(
      "passwordFieldSet"
    ) as HTMLElement;
    element.click();
  }
}
