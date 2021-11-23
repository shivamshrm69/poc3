import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
  {
    path:"viewUsers",
    component:ViewUsersComponent,
    pathMatch:"full"
  }
  ,
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"addUser",
    component:AddUserComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
