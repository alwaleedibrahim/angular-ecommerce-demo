import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { AdsComponent } from './components/ads/ads.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: "contact",
    component:ContactComponent,
    title: "Contact Us"
  },
  {
    path: "about",
    component:AboutComponent,
    title: "About Us"
  },
  {
    path: "admin/product",
    component:NewProductComponent,
    title: "New Product",
    canActivate: [authGuard]
  },
  {
    path: "admin/product/:id",
    component:NewProductComponent,
    title: "Edit Product",
    canActivate: [authGuard]
  },
  {
    path: "product/:id",
    component:ProductDetailsComponent,
    title: "Product Details",
    canActivate: [authGuard]
  },
  {
    path: "product",
    component:ProductsComponent,
    title: "Products"
  },
  {
    path: "ads",
    component:AdsComponent,
    title: "Ads"
  },
  {
    path: "login",
    component:LoginComponent,
    title: "Login to continue"
  },
  {
    path: "signup",
    component:SignupComponent,
    title: "Create new user account"
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 Not Found',
  },
];
