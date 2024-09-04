import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { Store } from '../../models/store';
import { CreditcardPipe } from '../../pipes/creditcard.pipe';
import { Discount } from '../../models/discount';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CategoryApiService } from '../../services/category-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, CreditcardPipe, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  store1: Store;
  clientName: string;
  isPurshased: boolean = false;
  discount: Discount;
  categoryList: ICategory[] = [];
  cart: IProduct[];
  cartTotal : number;
  categoryFilter: string ='';
  maxPriceFilter: number = 999999999
  minPriceFilter: number = 0
  constructor(private productService : ProductService, private categoryApiService : CategoryApiService) {
    this.store1 = new Store(
      'Noon',
      ['Cairo', 'Alexanderia', 'Giza'],
      'noon.png'
    );
    this.clientName = 'Alwaleed';
    this.discount = Discount.d_10
    categoryApiService.getAll().subscribe({
      next: (data) => {
        this.categoryList=data
      }
    })
    this.cart = this.productService.getCart()
    this.cartTotal = this.productService.getCartTotal()
  }

  addToCart(product : IProduct){
    this.productService.addToCart(product)
    this.cart = this.productService.getCart()
    this.cartTotal = this.productService.getCartTotal()
  }


}
