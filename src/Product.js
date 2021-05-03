import './Product.css';
import ProductContext from "./ProductContext";
import { useContext } from "react";

function Product({title,price,description,image}){

    const { addToCart } = useContext(ProductContext);
    return ( 
      
      <div className="product-card">
        <div className="product-image">
          <img
            src={image} title={title} alt={description} 
          />
        </div>
        <div className="product-info">
          <h5>{title}</h5>
          <h6>${price}</h6>
          <button onClick={()=>addToCart(title)}> + Add to cart + </button>
        </div>
      </div>

    );
  }
export default Product;
