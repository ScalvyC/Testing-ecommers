import "./Store.css";
import { StoreItem } from "../../components/Product/StoreItem";
import { useGetProductsQuery } from "../../services/dummyJsonApi";

export function Store() {
  const { data: products = [], error, isLoading } = useGetProductsQuery(0);

  if (isLoading) {
    return (
      <div className="store-page">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-page">
        <p>There was an error loading products.</p>
      </div>
    );
  }

  return (
    <div className="store-page">
      <div className="store-container">
        <div className="store-header">
          <h1 className="text-center">Store</h1>
          <p>Explore our latest products and deals</p>
        </div>

        <div className="store-grid">
          {products.map((item) => (
            <div className="store-card" key={item.id}>
              <StoreItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
