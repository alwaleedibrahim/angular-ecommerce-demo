import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardStyleDirective } from '../../directives/card-style.directive';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, CardStyleDirective, RouterModule],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  filteredList: IProduct[] = [];
  categoryFilter: string = '';
  maxPriceFilter: number = 99999999;
  minPriceFilter: number = 0;

  @Output() addedProductToCart : EventEmitter<IProduct> = new EventEmitter<IProduct>();
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.filteredList = this.productService.getAll();
  }

  @Input() set _categoryFilter(value: string) {
    this.categoryFilter = value;
    this.filteredList = this.productService.filter(
      this.categoryFilter,
      this.maxPriceFilter,
      this.minPriceFilter
    );
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

  buy(id: number) {
    this.productService.buy(id)
  }

  addToCart(product: IProduct) {
    this.addedProductToCart.emit(product)
  }
}
