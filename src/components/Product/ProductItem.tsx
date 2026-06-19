import { useState, useEffect } from "react";
import type { Product } from "../../constants/types";
import { useGetProductsByCategoryQuery } from "../../services/dummyJsonApi";
import { Link } from "react-router-dom";
import { AddToCart } from "../Cart/AddToCart";

import "./ProductItem.css";

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  const { data, isLoading, error } = useGetProductsByCategoryQuery(
    product.category,
  );

  const categoryProducts = data?.products;

  const similarProducts = categoryProducts?.filter((item) => {
    return item.id !== product.id;
  });

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [product.id, product.images]);

  return (
    <div>
      <div className="product-page">
        <div className="section-1">
          <div className="product-main-image">
            <div className="product-gallery">
              {product.images?.map((img) => (
                <div key={img} onClick={() => setSelectedImage(img)}>
                  <img src={img} />
                </div>
              ))}
            </div>
            <div className="img-preview">
              <img style={{ width: 750 }} src={selectedImage} alt="" />
            </div>
          </div>
        </div>

        <div className="section-2">
          <div className="product-main-info">
            <div className="product-main-info-1">
              <h1>{product.title}</h1>
              <h2>${product.price}</h2>
            </div>
            <p>Rating: 🌟{product.rating}</p>
            <div>
              <AddToCart id={product.id} />
            </div>
          </div>

          <div className="product-description">
            <h5>Description</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-info">
            <p>Brand: {product.brand}</p>
          </div>

          <div className="product-details">
            <h3>Product Details</h3>

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
      </div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {error && <p>Could not load similar products.</p>}

      {similarProducts && similarProducts.length > 0 && (
        <div className="similar-products">
          <h2>Similar Products</h2>

          <div className="similar-products-list">
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="similar-product-card"
              >
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
                <p>${item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="product-reviews">
        <h3>Reviews</h3>

        {product.reviews?.map((review, index) => (
          <div key={index} className="review-card">
            <p>
              <strong>{review.reviewerName}</strong>
            </p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
