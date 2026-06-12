import { useGetProductQuery } from "../services/dummyJsonApi";
import { AddToCart } from "./AddToCart";
import { formatCurrency } from "../utilities/formatCurrency";
import "./CartItem.css";
import { Link } from "react-router-dom";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { data: item, isLoading, error } = useGetProductQuery(id);

  if (isLoading) {
    return null;
  }

  if (error || item == null) {
    return null;
  }

  return (
    <div className="cart-container">
      <img
        src={item.thumbnail}
        alt={item.title}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />

      <div className="me-auto">
        <div>
          <Link
            to={`/product/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {item.title}
          </Link>

          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>

        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>

        <div>{formatCurrency(item.price * quantity)}</div>

        <div className="store-item-actions">
          <AddToCart id={id} />
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
