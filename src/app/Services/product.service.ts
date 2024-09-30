import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// Define your environment if needed
import { environment } from '../environments/environment.prod';

export interface Product {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createItem(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, product);
  }

  deleteItem(product_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${product_id}`);
  }

  updateItem(id: number, product: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, product);
  }

  readItem(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // readitem(product_id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/${product_id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  readitem(productId: string) {
    const url = `http://localhost:3000/api/v1/products/${productId}`;
    return this.http.get(url);
  }
  
  
  updateitem(id: any, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(this.handleError)
    );
  }
  
  // Handle errors from HTTP requests
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);  // Log error to console
    return throwError(() => new Error(errorMessage));  // Throw an error observable
  }
}
