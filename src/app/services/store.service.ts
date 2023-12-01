import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Product } from "../models/product.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private httpClient = inject(HttpClient);

  getProducts(
    category = "",
    limit = "",
    sort = "desc"
  ): Observable<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(
        `${STORE_BASE_URL}/products${
          category ? `/category/${category}` : ""
        }?sort=${sort}&limit=${limit}`
      )
      .pipe(
        map((products) => {
          return products.map((product) => {
            product.onCart = false;
            return product;
          });
        })
      );
  }
  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
  getAllProducts(): Observable<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${STORE_BASE_URL}/products`)
      .pipe(
        map((products) => {
          return products.map((product) => {
            product.onCart = false;
            return product;
          });
        })
      );
  }
}
