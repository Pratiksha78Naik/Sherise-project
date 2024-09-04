import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostProductComponent } from './post-product/post-product.component';
import { PostCouponComponent } from './post-coupon/post-coupon.component';
import { AuthGuard } from '../auth.guard';



const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UpdateuserComponent, canActivate: [AuthGuard] },
  { path: 'category', component: PostCategoryComponent, canActivate: [AuthGuard] },
  { path: 'product', component: PostProductComponent, canActivate: [AuthGuard] },
  { path: 'post-coupon', component: PostCouponComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
