import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth.guard.service';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { ListSubredditComponent } from './subreddit/list-subreddit/list-subreddit.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { ViewSubredditComponent } from './subreddit/view-subreddit/view-subreddit.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuardService] },
  {path: 'list-subreddits', component: ListSubredditComponent },
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuardService] },
  {path: 'view-post/:id', component: ViewPostComponent },
  {path: 'view-subreddit/:id', component:ViewSubredditComponent },
  {path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuardService] },
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
