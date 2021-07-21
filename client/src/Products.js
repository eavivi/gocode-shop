import "./Products.css";
import Product from "./Product";
//import Cart from "./Cart";

function Products({ products }) {
  return (
    <section className="products">
      {products.map(({ _id, title, price, description, image }) => (
        <Product
          key={_id}
          id={_id}
          title={title}
          price={price}
          description={description}
          image={image}
        />
      ))}
    </section>
  );
}
export default Products;
