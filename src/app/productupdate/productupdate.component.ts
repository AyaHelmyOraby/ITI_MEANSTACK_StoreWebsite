import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service'; // Import your service
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  standalone: true,
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css'],
  imports: [NgClass, FormsModule]
})
export class ProductupdateComponent {
  product: any = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  };

  constructor(private productService: ProductService, private router: Router) {}

  // Convert the product ID to a number
  getNumericId(): number {
    return Number(this.product._id);
  }

  // Update the product
  updateItem() {
    console.log("Updating product with ID:", this.getNumericId()); // Check the ID
    const updatedProduct = {
      title: this.product.title,
      description: this.product.description,
      price: this.product.price,
      category: this.product.category,
      image: this.product.image
    };
  
    this.productService.updateItem(this.getNumericId(), updatedProduct).subscribe(
      (updatedData) => {
        console.log('Product updated:', updatedData);
        this.router.navigate(['/product']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  
}
