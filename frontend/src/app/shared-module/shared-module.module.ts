import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { FieldsetModule } from "primeng/fieldset";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AccordionModule } from "primeng/accordion";
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [],
  imports: [CommonModule, TableModule, DialogModule, AccordionModule, AutoCompleteModule],
  exports: [TableModule, DialogModule, CommonModule, AccordionModule],
})
export class SharedModule {}
