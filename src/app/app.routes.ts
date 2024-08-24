import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { AdsComponent } from './components/ads/ads.component';

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
    path: "product/:id",
    component:ProductDetailsComponent,
    title: "Product Details"
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
    path: '**',
    component: NotFoundComponent,
    title: '404 Not Found',
  },
];
