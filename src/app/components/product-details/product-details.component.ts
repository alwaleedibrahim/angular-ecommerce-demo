import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: IProduct | undefined = undefined;
  productsIDs: number[] = [];
  productIndex: number = 0;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productsIDs = this.productService.getProductsIDs();
    console.log(this.productsIDs);
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id')) || 0;
      this.product = this.productService.getProductByID(this.productId);
      if (!this.product) {
        this.router.navigate(['**']);
      }
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
}
