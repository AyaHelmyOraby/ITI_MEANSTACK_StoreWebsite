import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Router, RouterLink } from '@angular/router';  // Import Router for navigation after deletion
import { NgClass } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgClass, FormsModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title = 'E-Commerce';
  products: any[] = [];

  // Inject ProductService and Router
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    
    this.loadProducts();  // Fetch the list of products when the component is initialized
  }

  // Method to fetch the list of products
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.data.products;  // Assuming response structure has data.products
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  // Method to delete a product by ID
  deleteItem(product_id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteItem(product_id).subscribe(
        (res) => {
          console.log('Product deleted successfully:', res);
          this.loadProducts();  // Reload the product list after deletion
          
          // Optionally, use Router to refresh the current route (if needed)
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate([this.router.url]);
          // });

          // Alternatively, reload the entire page (less recommended)
          // window.location.reload();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
