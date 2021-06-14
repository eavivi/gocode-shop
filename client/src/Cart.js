import { useContext } from "react";
import ProductContext from "./ProductContext";
import "./Cart.css";

function Cart() {
  const { cart } = useContext(ProductContext);
  const { totalPrice } = useContext(ProductContext);
  const { numItems } = useContext(ProductContext);
  const cartItem = (
    <ol className="cart-items">
      {cart.map((item) => (
        <li>
          <img src={item.image} />
          <br />
          <span className="product-features">title:</span>
          {item.title} <br />
          <span className="product-features">price:</span> {item.price}$<br />
          <br />
        </li>
      ))}
    </ol>
  );

  return (
    <div className="cart">
      {" "}
      <button className="button--alt">x</button>
      <span className="myorder">
        <br />
        My order
      </span>
      {cartItem}
      <div className="total">
        <span>Price:</span>
        <span>{totalPrice}$</span>
      </div>
      <div className="total">
        <span>Num Items:</span>
        <span>{numItems}</span>
      </div>
      <div className="actions">
        <button className="button">Payment</button>
      </div>
    </div>
  );
}

export default Cart;
