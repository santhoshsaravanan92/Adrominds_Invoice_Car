import { HostListener, Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Adrobee Billing';
  
	@HostListener('window:unload', ['$event'])
	unloadHandler(event) {
		localStorage.clear();
	}

	@HostListener('window:beforeunload', ['$event'])
	beforeUnloadHandler(event) {
		localStorage.clear();
	}

	constructor(private authService: AuthenticationService) {}

	ngOnDestroy(): void {
		this.authService.logout();
	}
}
