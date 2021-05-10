import "./ProductDetails.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
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
        product id: {product.id}. <br />
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
    /*<div>
      product id:{id}
      <br />
      title: {product.title}
      <br />
      price: {product.price}$
      <br />
      category: {product.category}
      <br />
      image: {product.image}
      <br />
      description: {product.description}
    </div>*/
  );
}
export default ProductDetails;
