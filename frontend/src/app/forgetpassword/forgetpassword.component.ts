import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Constants } from "../helpers/constant";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../components/base/base.component";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.sass"],
})
export class ForgetpasswordComponent extends BaseComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  submitted: boolean = false;
  isforgetLoadDone: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private authService: AuthenticationService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  get getFormControls() {
    return this.forgetPasswordForm.controls;
  }

  forgetPasswordFormSubmit() {
    this.submitted = true;
    this.isforgetLoadDone = false;
    if (this.forgetPasswordForm.invalid) {
      this.isforgetLoadDone = true;
      return;
    }
    const username = this.forgetPasswordForm.get("email").value;
    this.authService.forgetPasswordCheck(username).subscribe(
      (res) => {
        this.resetFormControls();
        this.updateToastMessage(
          Constants.forgetPasswordSuccess,
          Constants.success,
          Constants.forgetPassword
        );
      },
      (err) => {
        if (err.status === 400) {
          console.log(err);
          this.resetFormControls();
          this.updateToastMessage(
            Constants.invalidEmail,
            Constants.error,
            Constants.forgetPassword
          );
        }
      }
    );
  }

  resetFormControls() {
    this.isforgetLoadDone = true;
    this.submitted = false;
    this.forgetPasswordForm.reset();
  }
}
