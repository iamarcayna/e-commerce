import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { Product } from "../models/product.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private httpClient = inject(HttpClient);
  categories: Subject<Array<string>> = new Subject<Array<string>>();

  constructor() {
    this.httpClient
      .get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
      .subscribe((categories) => {
        this.categories.next(categories);
      });
  }

  getProducts(
    category = "",
    limit = "",
    sort = "desc"
  ): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products${
        category ? `/category/${category}` : ""
      }?sort=${sort}&limit=${limit}`
    );
  }
  getAllCategories(): Subject<Array<string>> {
    return this.categories;
  }
}
