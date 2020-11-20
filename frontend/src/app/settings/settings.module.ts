import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsBaseComponent } from "./settings-base/settings-base.component";
import { CustomerSettinsComponent } from "./customer-settins/customer-settins.component";
import { ProductSettingsComponent } from "./product-settings/product-settings.component";
import { SharedModule } from "../shared-module/shared-module.module";

@NgModule({
  declarations: [
    SettingsBaseComponent,
    CustomerSettinsComponent,
    ProductSettingsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SettingsBaseComponent],
})
export class SettingsModule {}
