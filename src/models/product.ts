export interface Product {
    asin: string;
    title: string;
    price: number;
    originalPrice: number;
    currency: string;
    rating: string;
    totalReviews: string,
    image: string,
    isPrim: string,
    url: string
    //product details
    brand: string;
    availability: string;
    description: string;
    features: [];
    images: [];
    specifications: {};
    variants: [];
    categories: [];
}