import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductReadService {
  private _productsData = new BehaviorSubject<Product[]>([]);

  constructor() {}

  get productsData(): Product[] {
    return this._productsData.value;
  }

  set productsData(productsData: Product[]) {
    this._productsData.next(productsData);
  }
}
