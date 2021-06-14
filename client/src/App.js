import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Products from "./Products";
import Cart from "./Cart";
import ProductContext from "./ProductContext";
import { Slider } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((Response) => Response.json())
      .then((data) => setProducts(data));
  }, []);

  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});

  const categories = Object.keys(groupBy(products, "category"));

  const [categor, setCategor] = useState("All Categories");

  function chooseCategor(category) {
    setCategor(category);
  }
  const [cart, setCart] = useState([]);
  const [numItems, setNumItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function addToCart(id) {
    const productToAdding = products.find((p) => p.id === id);
    /*setCart(
      cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            amount: product.amount + 1,
          };
        } else {
          return productToAdding;
        }
      })
    );*/

    setCart([...cart, productToAdding]);
    setNumItems(cart.length + 1);
    setTotalPrice(totalPrice + productToAdding.price);
  }

  return (
    <ProductContext.Provider value={{ addToCart, numItems, totalPrice, cart }}>
      <nav>
        <Link to="/">Home Page</Link>
      </nav>
      <Switch>
        <Route path="/Products/:id">
          <ProductDetails />
        </Route>
        <Route path="/">
          <div className="App">
            <Header categories={categories} choose={chooseCategor} />
            <Slider />
            <div className="cart">
              <Cart />
            </div>
            <Products
              products={products.filter(
                (product) =>
                  product.category === categor || categor === "All Categories"
              )}
            />
          </div>
        </Route>
      </Switch>
    </ProductContext.Provider>
  );
}

export default App;
