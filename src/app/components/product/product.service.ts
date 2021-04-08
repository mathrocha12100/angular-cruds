import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  baseUrl = 'http://localhost:3001/products';

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, '*', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  errorHandler(error: any): Observable<any> {

    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Product>(url);
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Product>(url);
  }

  updateProduct(id: number, body: Product): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<Product>(url, body);
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
