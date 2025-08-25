export interface UpdateBuyerAddress{
    full_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    phone_number: string;
}

export interface PostBuyerAddress extends UpdateBuyerAddress {
    is_default: boolean;
}