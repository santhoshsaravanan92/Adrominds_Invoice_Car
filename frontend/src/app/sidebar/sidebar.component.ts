import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { isAssistant } from "../helpers/utilities";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit {
  componentToLoad: string = "";
  username: string = "";
  companyName: string = "";
  isAssistantLoggedIn: boolean = false;
  showUserMenu: boolean = false;
  constructor(private authServices: AuthenticationService) {}

  ngOnInit(): void {
    this.componentToLoad = "dashboard";

    const name = localStorage.getItem("name");
    const cname = localStorage.getItem("companyname");

    this.username = name != "" ? atob(name) : "";
    this.companyName = cname != "" ? atob(cname) : "";

    if (isAssistant()) this.isAssistantLoggedIn = true;
  }

  componentSelector(selectedComponent) {
    if (selectedComponent === "profile") {
      this.componentToLoad = "profile";
    } else if (selectedComponent === "dashboard") {
      this.componentToLoad = "dashboard";
      document.getElementById("menubardashboard").classList.add("active");
      document.getElementById("menubartemplate").classList.remove("active");
      document.getElementById("menubarInvoice").classList.remove("active");
      document.getElementById("menubarCustomer").classList.remove("active");
      document.getElementById("menubarExpense").classList.remove("active");
    } else if (selectedComponent === "settings") {
      this.componentToLoad = "settings";
    } else if (selectedComponent === "invoice") {
      this.componentToLoad = "invoice";
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubartemplate").classList.remove("active");
      document.getElementById("menubarInvoice").classList.add("active");
      document.getElementById("menubarCustomer").classList.remove("active");
      document.getElementById("menubarExpense").classList.remove("active");
    } else if (selectedComponent === "customer") {
      this.componentToLoad = "customer";
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubartemplate").classList.remove("active");
      document.getElementById("menubarInvoice").classList.remove("active");
      document.getElementById("menubarCustomer").classList.add("active");
      document.getElementById("menubarExpense").classList.remove("active");
    } else if (selectedComponent === "expense") {
      this.componentToLoad = "expense";
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubartemplate").classList.remove("active");
      document.getElementById("menubarInvoice").classList.remove("active");
      document.getElementById("menubarCustomer").classList.remove("active");
      document.getElementById("menubarExpense").classList.add("active");
    } else {
      this.componentToLoad = "template";
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubartemplate").classList.add("active");
      document.getElementById("menubarInvoice").classList.remove("active");
      document.getElementById("menubarCustomer").classList.remove("active");
      document.getElementById("menubarExpense").classList.remove("active");
    }
  }

  logout() {
    this.authServices.logout();
  }

  userImageMouseHover(isHover) {
    if (isHover) {
      this.showUserMenu = true;
    } else {
      this.showUserMenu = false;
    }
  }
}
