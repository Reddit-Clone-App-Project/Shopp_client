//! All the type in here may not be accurate, I just create to match the display of the UI

export interface FlashSaleItem {
    name: string;
    price: number;
    image_url: string;
    discount: number;
    sold: number;
    isMall: boolean;
}

// !Currently for convenience, I declare all types in this product.ts
interface Store {
    id: number;
    name: string;
    profile_img: string | null;
}

interface Category {
    id: number;
    name: string;
    slug: string | null;
}

interface Discount {
    id: number;
    name: string;
    discount_type: string;
    discount_value: string;
    start_date: Date;
    end_at: Date;
}

interface ItemImage {
    id: number;
    url: string;
    alt_text: string | null;
}

interface ItemVariant {
    id: number;
    variant_name: string;
    price: number;
    stock_quantity: number;
    sku: string;
    images: ItemImage[] | null;
    discount: Discount[] | null;
}

export interface Item {
    id: number;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
    is_published: boolean;
    views: string;
    bought: number;
    sku: string;
    store: Store | null;
    category_hierarchy: Category[] | null; // Show all categories associated with the product
    promotion_image: ItemImage | null;
    variants: ItemVariant[] | null;
    product_images: ItemImage[] | null;
}