import { useEffect, useState } from "react";
import type { Product } from "../../constants/types";
import { useGetProductsByCategoryQuery } from "../../services/dummyJsonApi";
import { Link } from "react-router-dom";
import { AddToCart } from "../Cart/AddToCart";

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  const { data, isLoading, error } = useGetProductsByCategoryQuery(
    product.category,
  );

  const similarProducts = (data?.products ?? []).filter(
    (item) => item.id !== product.id,
  );

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] ?? product.thumbnail,
  );

  useEffect(() => {
    setSelectedImage(product.images?.[0] ?? product.thumbnail);
  }, [product.id, product.images, product.thumbnail]);

  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* Main Product Area */}
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Images */}
        <section>
          <div className="flex items-start gap-4">
            {/* Small Images: vertically stacked on the left */}
            <div className="flex shrink-0 flex-col gap-3">
              {product.images?.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className="rounded-[10px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="View product image"
                >
                  <img
                    src={img}
                    alt={product.title}
                    className={`h-20 w-20 rounded-[10px] border-2 object-cover transition duration-200 hover:scale-105 ${
                      selectedImage === img
                        ? "border-yellow-500"
                        : "border-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div>
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-[600px] w-full max-w-[750px] object-contain"
              />
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section className="flex flex-col gap-6">
          <div className="border-b-2 border-[#f3f3f3] pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-[2rem] font-bold text-black">
                {product.title}
              </h1>

              <h2 className="text-[2rem] font-bold text-yellow-500">
                ${product.price}
              </h2>
            </div>

            <p className="mt-3 text-base">Rating: 🌟 {product.rating}</p>

            <div className="mt-4">
              <AddToCart id={product.id} />
            </div>
          </div>

          <div className="leading-7">
            <h5 className="mb-2 text-[1.1rem] font-semibold text-yellow-500">
              Description
            </h5>

            <p>{product.description}</p>
          </div>

          <div className="rounded-lg border-l-4 border-yellow-500 bg-[#fafafa] p-4">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <h3 className="mb-4 text-xl font-bold text-yellow-500">
              Product Details
            </h3>

            <div className="space-y-3">
              <p>Weight: {product.weight}g</p>

              <p>
                Dimensions: {product.dimensions.width} ×{" "}
                {product.dimensions.height} × {product.dimensions.depth}
              </p>

              <p>Warranty: {product.warrantyInformation}</p>
              <p>Shipping: {product.shippingInformation}</p>
              <p>Return Policy: {product.returnPolicy}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div
            className="h-[120px] w-[120px] animate-spin rounded-full border-[16px] border-[#f3f3f3] border-t-[#cace00]"
            role="status"
            aria-label="Loading similar products"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mx-auto max-w-[1400px] px-4 py-4 text-red-600 sm:px-6 lg:px-8">
          Could not load similar products.
        </p>
      )}

      {similarProducts.length > 0 && (
        <section
          id="similar-products"
          className="scroll-mt-24 mx-auto mt-8 max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8"
        >
          <h2 className="mb-2 ml-2 text-2xl font-bold text-yellow-500">
            Similar Products
          </h2>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="w-[220px] no-underline! shrink-0 snap-start scroll-ms-4 rounded-lg border border-[#ddd] p-4 text-[#111] no-underline! transition duration-200 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-lg"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-40 w-full rounded-md object-cover"
                />

                <h3 className="mt-3 line-clamp-2 font-bold text-black! ">
                  {item.title}
                </h3>

                <p className="mt-1 font-semibold text-yellow-600">
                  ${item.price}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-8 max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
        <h3 className="mb-4 text-2xl font-bold text-yellow-500">Reviews</h3>

        <div className="space-y-4">
          {product.reviews?.map((review, index) => (
            <article
              key={index}
              className="rounded-xl border border-[#e5e5e5] bg-white p-5"
            >
              <p className="font-bold">{review.reviewerName}</p>

              <p className="mt-1 text-yellow-600">Rating: {review.rating}</p>

              <p className="mt-2 text-gray-700">{review.comment}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
