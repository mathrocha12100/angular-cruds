import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  updateProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService
      .updateProduct(Number(id), this.product)
      .subscribe(() => {
        this.productService.showMessage('Produto atualizado');
        this.router.navigate(['/products']);
      });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(Number(id)).subscribe((response) => {
      this.product = response;
    });
  }
}
