import { Component, OnDestroy } from '@angular/core';
import { ManageProductService } from '../../services/manage-product.service';
import { IProduct } from '../../models/iproduct';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryApiService } from '../../services/category-api.service';
import { ICategory } from '../../models/icategory';
import { Subscription } from 'rxjs';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnDestroy {
  product: IProduct = {} as IProduct;
  productId!: string | number | null;
  categoryList!: ICategory[];
  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  showDelConfirm: boolean = false
  constructor(
    private productService: ManageProductService,
    private productApiService: ProductApiService,
    private router: Router,
    private categoryApiService: CategoryApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sub1 = categoryApiService.getAll().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
    });
    this.sub2 = this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.sub3 = this.productApiService
          .getProductByID(this.productId)
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: (err) => {
              console.log(this.productId);
              this.router.navigate(['**']);
            },
          });
      }
    });
  }

  createProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        this.router.navigate(['/product', data.id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe({
      next: (data) => {
        this.router.navigate(['/product', data.id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleSubmission() {
    if (this.productId) {
      this.updateProduct()
    } else {
      this.createProduct()
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
