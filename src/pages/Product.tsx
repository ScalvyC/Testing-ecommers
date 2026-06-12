import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/dummyJsonApi";
import { ProductItem } from "../components/ProductItem";
import "./Product.css";

export function Product() {
  const { id } = useParams();

  const { data, isLoading, error } = useGetProductQuery(Number(id));

  if (isLoading)
    return (
      <div>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  if (error || !data) return <div></div>;

  return <ProductItem product={data} />;
}
