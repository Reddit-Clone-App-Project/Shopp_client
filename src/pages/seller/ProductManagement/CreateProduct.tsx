import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SellerBlackHeader from "../../../components/SellerBlackHeader/SellerBlackHeader";
// SVG
import AddImage from "../../../assets/addImage.svg";
import Chat from "../../../assets/chat.svg";
import Cart from "../../../assets/HomePage/Header/shopping-cart.svg";
import BasicInformation from "../../../features/CreateProduct/BasicInformation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchYourStore } from "../../../features/StoreSlice/SellerStoreSlice";
import { API } from "../../../api";
import SalesInformation from "../../../features/CreateProduct/SalesInformation";

export type ProductDataType = {
  name: string;
  category: string;
  description: string;
  productImage: (string | File)[];
  promotionImage: string | File;
  price: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  sku: string;
  variant: VariantDataType[];
};

export type VariantDataType = {
  id: number;
  variantName: string;
  variantPrice: string;
  variantImage: (string | File)[];
  variantWeight: string;
  variantLength: string;
  variantWidth: string;
  variantHeight: string;
  variantSku: string;
};

const CreateProduct = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const storeId = useSelector(
    (state: RootState) => state.sellerStore.store?.id
  );
  const [productData, setProductData] = useState<ProductDataType>({
    name: "",
    category: "",
    description: "",
    productImage: [],
    promotionImage: "",
    price: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    sku: "",
    variant: [
      {
        id: 1,
        variantName: "",
        variantPrice: "",
        variantImage: [],
        variantWeight: "",
        variantLength: "",
        variantWidth: "",
        variantHeight: "",
        variantSku: "",
      },
    ],
  });

  const { name, description, promotionImage, productImage, price } =
    productData;

  useEffect(() => {
    if (!storeId) {
      dispatch(fetchYourStore());
    }
  }, [dispatch, storeId]);

  const handleFinalSubmit = async () => {
    try {
      // Validate image files
      const validateImageFile = (file: File): boolean => {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      };

      // Check promotion image
      if (
        productData.promotionImage &&
        typeof productData.promotionImage !== "string"
      ) {
        if (!validateImageFile(productData.promotionImage)) {
          toast.error(
            "Promotion image must be a valid image file (JPEG, PNG, or WebP)"
          );
          return;
        }
      }

      // Check product images
      for (const image of productData.productImage) {
        if (typeof image !== "string" && !validateImageFile(image)) {
          toast.error(
            "All product images must be valid image files (JPEG, PNG, or WebP)"
          );
          return;
        }
      }

      // Check variant images
      if (productData.variant && productData.variant.length > 0) {
        const validVariants = productData.variant.filter(
          (variant) => variant.variantName && variant.variantName.trim() !== ""
        );

        for (const variant of validVariants) {
          for (const image of variant.variantImage) {
            if (typeof image !== "string" && !validateImageFile(image)) {
              toast.error(
                `All variant images must be valid image files (JPEG, PNG, or WebP)`
              );
              return;
            }
          }
        }
      }

      const formData = new FormData();

      // Add basic product information
      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("weight", productData.weight);
      formData.append("length", productData.length);
      formData.append("width", productData.width);
      formData.append("height", productData.height);
      formData.append("sku", productData.sku);
      formData.append("store_id", storeId?.toString() || "");

      // Add promotion image
      if (
        productData.promotionImage &&
        typeof productData.promotionImage !== "string"
      ) {
        formData.append("promotionImage", productData.promotionImage);
      }

      // Add product images
      productData.productImage.forEach((image) => {
        if (typeof image !== "string") {
          formData.append("productImages", image);
        }
      });

      // Add variants data if they exist
      if (productData.variant && productData.variant.length > 0) {
        // Filter out variants that have actual data
        const validVariants = productData.variant.filter(
          (variant) => variant.variantName && variant.variantName.trim() !== ""
        );

        if (validVariants.length > 0) {
          formData.append(
            "variants",
            JSON.stringify(
              validVariants.map((variant) => ({
                variantName: variant.variantName,
                variantPrice: variant.variantPrice,
                variantWeight: variant.variantWeight,
                variantLength: variant.variantLength,
                variantWidth: variant.variantWidth,
                variantHeight: variant.variantHeight,
                variantSku: variant.variantSku,
              }))
            )
          );

          // Add variant images
          validVariants.forEach((variant, variantIndex) => {
            variant.variantImage.forEach((image) => {
              if (typeof image !== "string") {
                formData.append(`variantImages_${variantIndex}`, image);
              }
            });
          });
        }
      }

      await API.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product created successfully!");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Network Error, try again!");
      }
    }
  };

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  return (
    <>
      <SellerBlackHeader
        section={"Product Management > Add a Product"}
        mLogo={"ml-1"}
        mSection={"ml-6"}
      />
      <div className="w-full min-h-screen flex gap-3 justify-between items-start text-white bg-gray-950 pt-20 px-6">
        <div className="w-1.5/6 bg-slate-700 px-2.5 pt-2.5 pb-4 mt-4">
          <h3 className="font-semibold mb-2.5 text-sm">
            Suggested information filling
          </h3>
          <ul className="space-y-2 text-[0.8rem] font-light">
            <li>✓ Add at least 3 images</li>
            <li className="flex">
              <p className="mr-1">✓</p>
              <p>Product name must be at least 25-100 characters long</p>
            </li>
            <li className="flex">
              <p className="mr-1">✓</p>
              <p>Add at least 100 characters in the product description</p>
            </li>
          </ul>
        </div>
        <div className="w-5/6">
          {step === 1 && (
            <BasicInformation
              data={productData}
              onChange={setProductData}
              onNext={goNext}
            />
          )}
          {step === 2 && (
            <SalesInformation
                data={productData}
                onChange={setProductData}
                onBack={goBack}
                onSubmit={handleFinalSubmit}
                storeId={storeId}
            />
          )}
        </div>

        {/* Preview */}

        <div className="w-1.5/6 bg-slate-700 px-2.5 py-2 mt-4">
          <p className="font-semibold">Preview</p>
          <img
            src={
              promotionImage
                ? typeof promotionImage === "string"
                  ? promotionImage
                  : URL.createObjectURL(promotionImage)
                : AddImage
            }
            alt="Product Preview Image"
            className="my-3 w-50 m-auto"
          />
          <h2 className="font-bold mb-3">{name}</h2>
          <div className="flex flex-wrap mb-2">
            {productImage.map((image, index) => (
              <img
                key={index}
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt={`Product Image ${index + 1}`}
                className="w-7 h-7 object-cover m-1 ml-0"
              />
            ))}
          </div>

          <h6 className="font-medium mb-2">{price} $</h6>
          <h6 className="font-medium mb-2">Description</h6>
          <p className="font-extralight text-[0.75rem]">{description}</p>

          <div className="flex h-12 my-4 mx-2">
            <button className="flex grow-1 items-center justify-center bg-blue-700">
              <img className="w-6" src={Chat} alt="Chat" />
            </button>
            <button className="flex grow-1 items-center justify-center bg-blue-700">
              <img className="w-6" src={Cart} alt="Cart" />
            </button>
            <button className="flex grow-2 items-center justify-center bg-purple-700">
              Buy Now
            </button>
          </div>

          <p className="font-extralight text-[0.75rem]">
            Images are for reference only and are not the final image the Buyer
            sees.
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
