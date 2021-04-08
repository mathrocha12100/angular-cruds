import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }

  onCancel(): void {
    this.productService.onCancel();
  }
}
