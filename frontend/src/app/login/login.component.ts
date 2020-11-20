import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { Constants } from "../helpers/constant";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../components/base/base.component";
import { isAssistant } from "../helpers/utilities";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  isLoadingDone: boolean = true;
  displayModal: boolean = false;
  modalHeader: string = "";
  modalContent: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    public messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  get getFormControls() {
    return this.loginForm.controls;
  }

  loginFormSubmit(): void {
    this.submitted = true;
    this.isLoadingDone = false;
    if (this.loginForm.invalid) {
      this.isLoadingDone = true;
      return;
    }

    const username = this.loginForm.get("username").value;
    const password = this.loginForm.get("password").value;

    this.authService.login(username, password).subscribe(
      (responseData) => {
        if (responseData.message !== "not authenticated") {
          this.resetLoginControls();
          localStorage.setItem("token", responseData.token);
          localStorage.setItem("data", responseData.userfield);
          
          if (isAssistant()) {
            localStorage.setItem('companyname', responseData.asstCompany);
            localStorage.setItem("name", "");
          } else {
            localStorage.setItem('companyname', responseData.company);
            localStorage.setItem("name", responseData.name);
          }

          this.router.navigateByUrl("/dashboard");
        } else {
          this.resetLoginControls();
          this.updateToastMessage(
            Constants.invalidLogin,
            Constants.error,
            Constants.login
          );
        }
      },
      (err) => {
        if (err.status === 401 || err.status === 422 || err.status === 400) {
          console.log(err);
          this.resetLoginControls();
          this.updateToastMessage(
            Constants.invalidLogin,
            Constants.error,
            Constants.login
          );
        }
      }
    );
  }

  toggleModal(modalFor: string): void {
    this.displayModal
      ? (this.displayModal = false)
      : (this.displayModal = true);
    if (modalFor === "tc") {
      this.modalHeader = Constants.tc;
      this.modalContent = "Terms and conditions of Adrobee";
    } else {
      this.modalHeader = Constants.pp;
      this.modalContent = "Adrobee's Privacy Policy";
    }
  }

  resetLoginControls(): void {
    this.isLoadingDone = true;
    this.loginForm.reset();
    this.submitted = false;
  }
}
