import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Components imports
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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SakhiyaComponent } from './Events/sakhiya/sakhiya.component';
import { AarogyaComponent } from './Events/aarogya/aarogya.component';
import { NayidishaComponent } from './Events/nayidisha/nayidisha.component';
import { UdaanComponent } from './Events/udaan/udaan.component';
import { PadbankComponent } from './Events/padbank/padbank.component';
import { KagajpadComponent } from './Events/kagajpad/kagajpad.component';
import { MquizComponent } from './LearnwithUs/mquiz/mquiz.component';
import { QuizComponent } from './LearnwithUs/quiz/quiz.component';
import { HygQuizComponent } from './LearnwithUs/hygquiz/hygquiz.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';

import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DemoAngularMaterialModule } from './DemoAngularMaterial';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    HealthComponent,
    McycleComponent,
    HygieneComponent,
    PshyComponent,
    EducationComponent,
    HealthcareAccessComponent,
    HcampsComponent,
    ParentsComponent,
    BoysComponent,
    MenstrualMythsComponent,
    ContactComponent,
    HomeRemediesComponent,
    NutriPcodComponent,
    NutrieffectComponent,
    PracticesAtHomeComponent,
    CommonComponent,
    AffectHygineComponent,
    PcodComponent,
    PcosComponent,
    DisordersComponent,
    PshyAnemiaBlogComponent,
    PshyAnxietyBlogComponent,
    PshyHormonesBlogComponent,


    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    HeaderComponent,
    FooterComponent,


    SakhiyaComponent,
    AarogyaComponent,
    NayidishaComponent,
    UdaanComponent,
    PadbankComponent,
    KagajpadComponent,
    MquizComponent,
    QuizComponent,
    HygQuizComponent,
    AccessibilityComponent,
    SignupComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoAngularMaterialModule


  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
