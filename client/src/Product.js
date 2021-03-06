import "./Product.css";
import ProductContext from "./ProductContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Product({ title, price, description, image, id }) {
  const { addToCart } = useContext(ProductContext);
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} title={title} alt={description} />
      </div>
      <div className="product-info">
        <h5>
          <Link to={`/${id}`}>{title}</Link>
        </h5>
        <h6>${price}</h6>
        <button onClick={() => addToCart(id)}> + Add to cart + </button>
      </div>
    </div>
  );
}
export default Product;
