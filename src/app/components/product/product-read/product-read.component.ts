import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductReadService } from './product-read.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit {
  // products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private productReadService: ProductReadService
  ) {
  }

  openModal(product: Product): void {
    this.dialog.open(DeleteProductComponent, {
      data: {
        product,
      },
    });
  }

  get products(): Product[] {
    return this.productReadService.productsData;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.productReadService.productsData = response;
      // this.products = response;
    });
  }
}
