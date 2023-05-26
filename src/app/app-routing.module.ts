import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth.guard.service';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuardService] },
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
