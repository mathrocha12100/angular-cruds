import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductReadComponent } from '../product-read/product-read.component';
import { ProductReadService } from '../product-read/product-read.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      product: Product;
    },
    private productService: ProductService,
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    private productReadService: ProductReadService
  ) {}

  removeProduct(productIdToRemove: number): Product[] {
    return this.productReadService.productsData.filter(
      (product) => product.id !== productIdToRemove
    );
  }

  deleteProduct(): void {
    if (this.data.product.id) {
      this.productService.deleteProduct(this.data.product.id).subscribe(() => {
        const newProducts = this.removeProduct(Number(this.data.product.id));
        this.productReadService.productsData = newProducts;
        this.productService.showMessage('Produto deletado com sucesso!');
      });
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {}
}
