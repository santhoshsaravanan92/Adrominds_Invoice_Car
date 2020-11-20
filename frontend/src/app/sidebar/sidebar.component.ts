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
    }
    else if (selectedComponent === "asstprofile") {
      this.componentToLoad = "asstprofile";
    } else if (selectedComponent === "dashboard") {
      this.componentToLoad = "dashboard";
      document.getElementById("menubardashboard").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
    } else if (selectedComponent === "assistant") {
      this.componentToLoad = "assistant";
      document.getElementById("menubarassistant").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
    } else if (selectedComponent === "products") {
      this.componentToLoad = "product";
      document.getElementById("menubarproduct").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
    } else if (selectedComponent === "sales") {
      this.componentToLoad = "sales";
      document.getElementById("menubarsales").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
    } else if (selectedComponent === "reports") {
      document.getElementById("menubarreport").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
      this.componentToLoad = "report";
    } else if (selectedComponent === "quotation") {
      document.getElementById("menubarquotation").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
      this.componentToLoad = "quotation";
    } else if (selectedComponent === "invoice") {
      document.getElementById("menubarinvoice").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarreminder").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
      this.componentToLoad = "invoice";
    } else if (selectedComponent === "reminder") {
      document.getElementById("menubarreminder").classList.add("active");
      // document.getElementById("menubarprofile").classList.remove("active");
      document.getElementById("menubardashboard").classList.remove("active");
      document.getElementById("menubarassistant").classList.remove("active");
      document.getElementById("menubarproduct").classList.remove("active");
      document.getElementById("menubarsales").classList.remove("active");
      document.getElementById("menubarreport").classList.remove("active");
      document.getElementById("menubarquotation").classList.remove("active");
      document.getElementById("menubarinvoice").classList.remove("active");
      // document.getElementById("menubarsettings").classList.remove("active");
      this.componentToLoad = "reminder";
    } else if (selectedComponent === "settings") {
      this.componentToLoad = "settings";
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
