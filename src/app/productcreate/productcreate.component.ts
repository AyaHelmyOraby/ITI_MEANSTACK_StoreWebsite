import { Component } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productcreate',
  standalone: true,
  templateUrl: './productcreate.component.html',
  styleUrls: ['./productcreate.component.css'],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to the imports array
  ],
})
export class ProductcreateComponent {
  product: any = {
    title: '',
    description: '', // Optional
    categoryId: 1, // Set a default category ID if necessary
    price: null, // Optional
    images: [] // Optional
  };

  public newProductSubject: Subject<any> = new Subject();

  constructor(private productService: ProductService, private router: Router) {}

  createProduct() {
    // Default values
    const defaultValues = {
        title: "New Product", // Required
        price: 10,            // Optional, but can be default
        description: "A description", // Optional, but can be default
        categoryId: 1,        // Use an existing category ID
        images: ["https://i.imgur.com/oO5OUjb.jpeg"], // Default image
    };

    // Prepare the new product object with user input or default values
    const newProduct: any = {
        title: this.product.title || defaultValues.title,
        price: this.product.price !== undefined ? Number(this.product.price) : defaultValues.price,
        description: this.product.description || defaultValues.description,
        categoryId: this.product.categoryId || defaultValues.categoryId,
        images: (this.product.images && this.product.images.length > 0) ? this.product.image : defaultValues.images,
    };

    // Log the prepared product for debugging
    console.log('Prepared product:', newProduct);

    // Call the service to create the product
    this.productService.createItem(newProduct).subscribe(
        (createdData) => {
            console.log('Product created:', createdData);
            this.router.navigate(['/home']); // Navigate to home after creation
        },
        (error) => {
            console.error('Error creating product:', error);
        }
    );
}


}
