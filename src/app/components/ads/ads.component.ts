import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  product: IProduct | undefined;
  adsObserver : Observable<IProduct> = new Observable((subscriber) => {
    console.log('Started');
    let i = 0
    const intervalId = setInterval(() => {
      subscriber.next(this.products[i++]);
      if (i>= this.products.length) {
        i = 0
      }
    }, 2000);
    return function unsubscribe() {
      clearInterval(intervalId);
      console.log("Unsubscribed")
    };
  });
  subscription!: Subscription;

  constructor(private productService: ProductService) {
    this.products = this.productService.getAll();
  }

  ngOnInit(): void {
    this.subscription = this.adsObserver.subscribe((data: IProduct) => {
      this.product = data
    });
  }

  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
