import { api } from "./apiClient.ts";
import {Product} from "../models/product";
import {ProductOffer} from "../models/productOffer"

export const productService = {
 getProductDetails(asin: string) {
    return api.get<Product>(
      `/products/getProductbyASIN?asin=${asin}`
    );
  },

  getProductOffers(asin: string) {
    return api.get<ProductOffer[]>(
      `/products/${asin}/offers`
    );
  },

  searchProducts(
    searchQuery: string,
    currentPage: number = 1
  ) {
    return api.get<Product[]>(
      '/products/search?query=' + searchQuery + "&page=" + currentPage,
      {
        searchQuery,
        currentPage,
      }
    );
  }
};