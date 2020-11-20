import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { HeaderLogoComponent } from "./components/header-logo/header-logo.component";
import { ProfileComponent } from "./profile/profile.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthenticationService } from "./services/authentication.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { FieldsetModule } from "primeng/fieldset";
import { Guardian } from "./helpers/guardian";
import { LoggedInGuardian } from "./helpers/loggedin-guardian";
import { ProfileService } from "./services/profile.service";
import { UsermanagementComponent } from "./assistants/usermanagement.component";
import { DialogOverviewExampleDialog } from "./assistants/assistant.modal.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { SidebarModule } from "primeng/sidebar";
import { SureDialogComponent } from "./components/sure-dialog/sure-dialog.component";
import { BaseComponent } from "./components/base/base.component";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { AssistantProfileComponent } from './assistants/assistant-profile/assistant-profile.component';
import { OnlynumberDirective } from './directives/onlynumber.directives';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForgetpasswordComponent,
    HeaderLogoComponent,
    ProfileComponent,
    SidebarComponent,
    UsermanagementComponent,
    DialogOverviewExampleDialog,
    SureDialogComponent,
    BaseComponent,
    AssistantProfileComponent,
    OnlynumberDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    FieldsetModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    SidebarModule,
    DialogModule,
    SettingsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthenticationService,
    ProfileService,
    Guardian,
    HttpClient,
    MessageService,
    LoggedInGuardian,
    ConfirmationService,
  ],
})
export class AppModule {}
