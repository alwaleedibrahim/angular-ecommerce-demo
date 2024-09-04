import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardStyleDirective } from '../../directives/card-style.directive';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, CardStyleDirective, RouterModule],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  filteredList: IProduct[] = [];
  categoryFilter: string = '';
  maxPriceFilter: number = 99999999;
  minPriceFilter: number = 0;
  subscription!: Subscription 

  @Output() addedProductToCart : EventEmitter<IProduct> = new EventEmitter<IProduct>();
  constructor(private productService: ProductService, private productApiService:ProductApiService) {}

  ngOnInit(): void {
    this.subscription = this.productApiService.getAll().subscribe({
      next: (data) => {this.filteredList = data}
    });
  }

  @Input() set _categoryFilter(value: string) {
    if(value != "all") {
      this.productApiService.getProductsByCatID(value).subscribe(data=>{
        this.filteredList =data
      })
    }
  }

  @Input() set _minPriceFilter(value: number) {
    this.minPriceFilter = value;
    this.filteredList = this.productService.filter(
      this.categoryFilter,
      this.maxPriceFilter,
      this.minPriceFilter
    );
  }
  @Input() set _maxPriceFilter(value: number) {
    this.maxPriceFilter = value;
    this.filteredList = this.productService.filter(
      this.categoryFilter,
      this.maxPriceFilter,
      this.minPriceFilter
    );
  }

  buy(id: number | string) {
    this.productService.buy(id)
  }

  addToCart(product: IProduct) {
    this.addedProductToCart.emit(product)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
