import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCategoryComponent } from './post-category/post-category.component';
import { PostProductComponent } from './post-product/post-product.component';
import { DemoAngularMaterialModule } from '../DemoAngularMaterial';
import { provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserComponent,
    UpdateuserComponent,
    PostCategoryComponent,
    PostProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoAngularMaterialModule
  ],
  providers: [
    provideHttpClient(withFetch()), // Modern HTTP client provider
  ]
})
export class AdminModule { }
