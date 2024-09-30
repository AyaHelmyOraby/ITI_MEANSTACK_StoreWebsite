import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductcreateComponent } from './productcreate/productcreate.component';
import { ProductupdateComponent } from './productupdate/productupdate.component';

export const routes: Routes = [
    { path: 'home', component: ProductComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path : 'productcreate' , component : ProductcreateComponent},
    {path : 'productupdate/:id' , component : ProductupdateComponent}

    // Redirect to home if no path is specified

];
