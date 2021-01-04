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
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { SidebarModule } from "primeng/sidebar";
import { SureDialogComponent } from "./components/sure-dialog/sure-dialog.component";
import { BaseComponent } from "./components/base/base.component";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { OnlynumberDirective } from "./directives/onlynumber.directives";
import { SettingsModule } from "./settings/settings.module";
import { InvoiceComponent } from "./invoice/invoice.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerModalComponent } from "./customer/customer-modal/customer-modal.component";
import { TemplatesComponent } from "./templates/templates.component";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ExpenseComponent } from "./expense/expense.component";
import { TabViewModule } from "primeng/tabview";
import { ExpenseModelComponent } from "./expense/expense-model/expense-model.component";
import { InvoiceFiltersComponent } from "./invoice/invoice-filters/invoice-filters.component";
import { AllinvoicesComponent } from "./invoice/allinvoices/allinvoices.component";
import { InvoiceModalComponent } from "./invoice/invoice-modal/invoice-modal.component";
import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForgetpasswordComponent,
    HeaderLogoComponent,
    ProfileComponent,
    SidebarComponent,
    SureDialogComponent,
    BaseComponent,
    OnlynumberDirective,
    InvoiceComponent,
    CustomerComponent,
    CustomerModalComponent,
    TemplatesComponent,
    ExpenseComponent,
    ExpenseModelComponent,
    InvoiceFiltersComponent,
    AllinvoicesComponent,
    InvoiceModalComponent,
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
    SettingsModule,
    AccordionModule,
    AutoCompleteModule,
    TabViewModule,
    CalendarModule,
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
