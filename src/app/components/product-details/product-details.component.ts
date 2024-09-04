import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../services/product-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId: number | string = 0;
  product: IProduct | undefined = undefined;
  productsIDs: (number | string)[] = [];
  productIndex: number = 0;
  sub1!: Subscription;
  sub2!: Subscription;
  constructor(
    private productService: ProductService,
    private productApiService: ProductApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.productApiService.getAll().subscribe((data)=> {
      this.productsIDs = data.map(p => p.id)
      this.productIndex = this.productsIDs.indexOf(this.productId)
    })
  }
  
  ngOnInit(): void {
    this.sub1 = this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id') || 0;
      this.sub2= this.productApiService.getProductByID(this.productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
           console.log(this.productId)
          this.router.navigate(['**']);
        },
      });
    });
  }

  prevProduct() {
    this.productIndex = this.productsIDs.indexOf(this.productId) - 1;
    this.router.navigate(['/product', this.productsIDs[this.productIndex]]);
  }

  nextProduct() {
    this.productIndex = this.productsIDs.indexOf(this.productId) + 1;
    this.router.navigate(['/product', this.productsIDs[this.productIndex]]);
  }


  ngOnDestroy(): void {

    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }
}
