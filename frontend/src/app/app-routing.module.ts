import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Guardian } from './helpers/guardian';
import { LoggedInGuardian } from './helpers/loggedin-guardian';

const routes: Routes = [
	{ path: '', component: SidebarComponent, canActivate: [Guardian] },
	{ path: 'login', component: LoginComponent, canActivate: [LoggedInGuardian] },
	{ path: 'dashboard', component: SidebarComponent, canActivate: [Guardian] },
	{ path: 'forgetpassword', component: ForgetpasswordComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
