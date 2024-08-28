import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostProductComponent } from './post-product/post-product.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UpdateuserComponent},
  { path: 'category', component:PostCategoryComponent},
  { path: 'product', component:PostProductComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
