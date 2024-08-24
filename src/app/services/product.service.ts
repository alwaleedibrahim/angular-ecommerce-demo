import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

/*
======== provide in specific component  ==========
@Injectable({
  providedIn: UserModule,
})

===== in UserModule =====
@ngModule({
  providers: [ProductService]
})
*/

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: IProduct[];
  cart: IProduct[]=[]

  constructor() {
    this.productList = [
      {
        id: 1,
        name: 'Odense 8-Seater Top Dining Table',
        price: 21500,
        quantity: 0,
        img: 'https://media.homecentre.com/i/homecentre/163650487-163650487-HC18082021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 1,
      },
      {
        id: 5,
        name: 'Trixia 4-Seater Glass Top Dining Table',
        price: 30000,
        quantity: 8,
        img: 'https://media.homecentre.com/i/homecentre/163645951-163645951-HC07102021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 1,
      },
      {
        id: 25,
        name: 'Gasha Marble Top Side Table',
        price: 14000,
        quantity: 10,
        img: 'https://media.homecentre.com/i/homecentre/160079085-160079085-HC020518_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 1,
      },
      {
        id: 7,
        name: 'Ventura Fabric Dining Chair',
        price: 1500,
        quantity: 2,
        img: 'https://media.homecentre.com/i/homecentre/161257427-161257427-HC280119_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 2,
      },
      {
        id: 17,
        name: 'Ventura Fabric Dining Chair',
        price: 1500,
        quantity: 2,
        img: 'https://media.homecentre.com/i/homecentre/162640761-162640761-HC23092020_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 2,
      },
      {
        id: 9,
        name: 'Boston Study Chair',
        price: 1000,
        quantity: 10,
        img: 'https://media.homecentre.com/i/homecentre/159671547-159671547-HCB1226OCT17_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 2,
      },
      {
        id: 10,
        name: 'Coby Extendable TV Unit',
        price: 13000,
        quantity: 0,
        img: 'https://media.homecentre.com/i/homecentre/163723189-163568026-HC16082021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 3,
      },
      {
        id: 15,
        name: 'Accent TV Unit',
        price: 36999,
        quantity: 4,
        img: 'https://media.homecentre.com/i/homecentre/161684469-161684469-HC210519_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 3,
      },
      {
        id: 55,
        name: 'Plymouth TV Unit',
        price: 36999,
        quantity: 3,
        img: 'https://media.homecentre.com/i/homecentre/163688823-163688823-HC05102021_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-d-sqr-pdp$',
        categoryID: 3,
      },
    ];
  }

  getAll(): IProduct[] {
    return this.productList;
  }

  getProductsByCatID(catID: string): IProduct[] {
    return this.getAll().filter((p) => p.categoryID.toString() == catID);
  }

  getProductByID( productID: number): IProduct | undefined {
    return this.getAll().find(p => p.id == productID)
  }

  getProductsIDs(): number[] {
    return this.productList.map(p=> p.id)
  }

  filter(
    categoryFilter: string = 'all',
    maxPriceFilter: number = 99999999,
    minPriceFilter: number = 0
  ) {
    let filtered = this.getAll();
    if (categoryFilter == 'all') {
      filtered = this.getAll();
    } else {
      filtered = this.getProductsByCatID(categoryFilter);
    }
    filtered = filtered.filter((p) => p.price >= minPriceFilter);
    filtered = filtered.filter((p) => p.price <= maxPriceFilter);
    return filtered;
  }

  buy(id: number) {
    const product: IProduct | undefined = this
      .getAll()
      .find((p) => p.id == id);
    if (product) {
      product.quantity = product.quantity - 1;
      product.purshasedDate = Date.now();
    }
  }

  addToCart(product : IProduct) : void {
    const currentProduct = {...product}
    currentProduct.quantity = 1
    const productInCart = this.cart.find(p => p.id == currentProduct.id)
    if (productInCart) {
      productInCart.quantity = productInCart.quantity + currentProduct.quantity
    } else {
      this.cart.push(currentProduct)
    }
  }

  getCart() : IProduct[] {
    return this.cart
  }

  getCartTotal() : number {
    let total = 0;
    for (let p of this.cart) {
      total += p.price * p.quantity
    }
    return total
  }
}
