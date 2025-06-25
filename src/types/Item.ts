//! All the type in here may not be accurate, I just create to match the display of the UI

export interface FlashSaleItem {
    name: string;
    price: number;
    image_url: string;
    discount: number;
    sold: number;
    isMall: boolean;
}

export interface Item {
    name: string;
    price: number;
    image_url: string;
    discount: number;
    sold: number;
    isMall: boolean;
    isFreeShipping: boolean;
    isBestPrice: boolean;
}