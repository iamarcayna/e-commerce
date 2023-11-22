import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CartComponent } from "./pages/cart/cart.component";
import { CartService } from "./services/cart.service";
import { StoreService } from "./services/store.service";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { VerticalNavigationComponent } from "./components/drawer/vertical-navigation/vertical-navigation.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    DrawerComponent,
    VerticalNavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [CartService, StoreService, StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
