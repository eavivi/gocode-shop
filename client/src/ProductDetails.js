import "./ProductDetails.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((Response) => Response.json())
      .then((data) => setProduct(data));
  }, []);
  return (
    <div className="card">
      <div className="image">
        <img
          src={product.image}
          title={product.title}
          alt={product.description}
        />
      </div>
      <h1>
        product id: {product._id} <br />
        <br />
      </h1>
      <h5>Title: {product.title}</h5>
      <br />
      <h4>"category": {product.category}</h4>
      <br />
      <h2>Price: {product.price}$</h2>
      <br />
      <div className="info">
        <h3>Description: {product.description}$</h3>
      </div>
    </div>
  );
}
export default ProductDetails;
