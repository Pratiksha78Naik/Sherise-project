import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { HealthComponent } from './ThingstoKnow/health/health.component';
import { McycleComponent } from './ThingstoKnow/mcycle/mcycle.component';
import { HygieneComponent } from './ThingstoKnow/hygiene/hygiene.component';
import { PshyComponent } from './ThingstoKnow/pshy/pshy.component';
import { EducationComponent } from './Services/education/education.component';
import { HealthcareAccessComponent } from './Services/healthcare-access/healthcare-access.component';
import { HcampsComponent } from './Services/hcamps/hcamps.component';
import { ParentsComponent } from './LearnwithUs/parents/parents.component';
import { BoysComponent } from './LearnwithUs/boys/boys.component';
import { MenstrualMythsComponent } from './LearnwithUs/menstrual-myths/menstrual-myths.component';
import { ContactComponent } from './Component/contact/contact.component';
import { HomeRemediesComponent } from './Blogs/home-remedies/home-remedies.component';
import { NutriPcodComponent } from './Blogs/nutri-pcod/nutri-pcod.component';
import { NutrieffectComponent } from './Blogs/nutrieffect/nutrieffect.component';
import { PracticesAtHomeComponent } from './Blogs/practices-at-home/practices-at-home.component';
import { CommonComponent } from './Blogs/common/common.component';
import { AffectHygineComponent } from './Blogs/affect-hygine/affect-hygine.component';
import { PcodComponent } from './Blogs/pcod/pcod.component';
import { PcosComponent } from './Blogs/pcos/pcos.component';
import { DisordersComponent } from './Blogs/disorders/disorders.component';
import { PshyAnemiaBlogComponent } from './Blogs/pshy-anemia-blog/pshy-anemia-blog.component';
import { PshyAnxietyBlogComponent } from './Blogs/pshy-anxiety-blog/pshy-anxiety-blog.component';
import { PshyHormonesBlogComponent } from './Blogs/pshy-hormones-blog/pshy-hormones-blog.component';
import { ProductsComponent } from './Services/products/products.component';
import { CartComponent } from './Services/cart/cart.component';
import { CheckoutComponent } from './Services/checkout/checkout.component';


import { SakhiyaComponent } from './Events/sakhiya/sakhiya.component';
import { AarogyaComponent } from './Events/aarogya/aarogya.component';
import { NayidishaComponent } from './Events/nayidisha/nayidisha.component';
import { UdaanComponent } from './Events/udaan/udaan.component';
import { PadbankComponent } from './Events/padbank/padbank.component';
import { KagajpadComponent } from './Events/kagajpad/kagajpad.component';
import { MquizComponent } from './LearnwithUs/mquiz/mquiz.component';
import { QuizComponent } from './LearnwithUs/quiz/quiz.component';
import { HygQuizComponent } from './LearnwithUs/hygquiz/hygquiz.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Adjust the path if necessary
import { DonateComponent } from './donate/donate.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'health', component: HealthComponent },
  { path: 'mcycle', component: McycleComponent },
  { path: 'hygiene', component: HygieneComponent },
  { path: 'pshy', component: PshyComponent },
 { path: 'education', component: EducationComponent, canActivate: [AuthGuard], data: { role: 'CUSTOMER' } },
  { path: 'healthcare-access', component: HealthcareAccessComponent, canActivate: [AuthGuard], data: { role: 'CUSTOMER'} },
  { path: 'hcamps', component: HcampsComponent, canActivate: [AuthGuard], data: { role: 'CUSTOMER'}},
  { path: 'parents', component: ParentsComponent },
  { path: 'boys', component: BoysComponent },
  { path: 'menstrual-myths', component: MenstrualMythsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home-remedies', component: HomeRemediesComponent },
  { path: 'nutri-pcod', component: NutriPcodComponent },
  { path: 'nutrieffect', component: NutrieffectComponent },
  { path: 'practices-at-home', component: PracticesAtHomeComponent },
  { path: 'affect-hygine', component: AffectHygineComponent },
  { path: 'common', component: CommonComponent },
  { path: 'pcod', component: PcodComponent },
  { path: 'pcos', component: PcosComponent },
  { path: 'disorders', component: DisordersComponent },
  { path: 'pshy-anemia-blog', component: PshyAnemiaBlogComponent },
  { path: 'pshy-anxiety-blog', component: PshyAnxietyBlogComponent },
  { path: 'pshy-hormones-blog', component: PshyHormonesBlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent },
  { path:'donate',component:DonateComponent},



  { path: 'sakhiya', component: SakhiyaComponent },
  { path: 'aarogya', component: AarogyaComponent },
  { path: 'nayidisha', component: NayidishaComponent },
  { path: 'udaan', component: UdaanComponent },
  { path: 'padbank', component: PadbankComponent },
  { path: 'kagajpad', component: KagajpadComponent },
  { path: 'mquiz', component: MquizComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'hygquiz', component: HygQuizComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
