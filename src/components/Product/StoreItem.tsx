import { Card } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import type { Product } from "../../constants/types";
import "./StoreItem.css";
import { Link } from "react-router-dom";
import { AddToCart } from "../Cart/AddToCart";

type StoreItemProps = Product;

export function StoreItem({ id, title, price, thumbnail }: StoreItemProps) {
  return (
    <Card className="store-item-card">
      <Card.Img variant="top" src={thumbnail} className="store-item-img" />

      <Card.Body className="store-item-body">
        <Link
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title>{title}</Card.Title>
        </Link>
        <Card.Text>{formatCurrency(price)}</Card.Text>

        <div className="store-item-actions">
          <AddToCart id={id} />
        </div>
      </Card.Body>
    </Card>
  );
}
