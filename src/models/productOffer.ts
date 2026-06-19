export interface ProductOffer {
    asin: string;
    price: number;
    currency: string;
    condition: string;
    isBuyBoxWinner: string,
    isFullFiledByAmazon: string,
    seller: Seller,
    shipping: Shipping
}

interface Seller {
    name: string;
    rating: string;
    totalRating: string;
}

interface Shipping {
    price: number;
    isFreeShipping: number;
    isPrime: string;
    estimatedDelivery: string;
}