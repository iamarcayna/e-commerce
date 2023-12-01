import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CartService } from "./services/cart.service";
import { StoreService } from "./services/store.service";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { VerticalNavigationComponent } from "./components/drawer/vertical-navigation/vertical-navigation.component";
import { ContainerDirective } from "./directives/container.directive";
import { IntersectingDirective } from "./directives/intersecting.directive";
import { ProductBoxComponent } from "./pages/home/components/product-box/product-box.component";
import { ProductComponent } from "./pages/home/components/product/product.component";
import { ProductMoreDetailComponent } from "./pages/home/components/product-more-detail/product-more-detail.component";
import { CheckoutCartComponent } from "./pages/checkout-cart/checkout-cart.component";
import { ModalService } from "./services/modal.service";
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DrawerComponent,
    VerticalNavigationComponent,
    ContainerDirective,
    IntersectingDirective,
    ProductBoxComponent,
    ProductComponent,
    ProductMoreDetailComponent,
    CheckoutCartComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CartService, StoreService, StoreService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
