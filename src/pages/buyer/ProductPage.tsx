import React from 'react';

const ProductPage = () => {
    const mockProduct = {
        id: 1,
        name: "Sample Product",
        image: {
            id: 1,
            product_id: 1,
            variant_id: 1,
            url: "https://example.com/image.jpg",
            alt_text: "Sample Product Image",
            position: 0
        },
        description: "This is a sample product description.",
        variants: [
            {
                id: 1,
                color: "Brown",
                variant: "Brown Leather",
                price: 100,
                stock: 50,
                weight: 10,
                dimension: 2, 
                is_available: true,
            },
            {
                id: 2,
                color: "Black",
                variant: "Black Leather",
                price: 100,
                stock: 50,
                weight: 10,
                dimension: 2,
                is_available: true,
            },
            {
                id: 3,
                color: "White",
                variant: "White Leather",
                price: 100,
                stock: 50,
                weight: 10,
                dimension: 2,
                is_available: true,
            }
        ],
        store: [

        ],
        category: [

        ],

    }

  return (
    <div></div>
  )
}

export default ProductPage